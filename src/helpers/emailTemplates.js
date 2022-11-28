const frodo = require("@rockcarver/frodo-lib");
const utils = require("./utils.js");
const fs = require("fs");
const process = require('process');

const { exportEmailTemplatesToFile } = frodo.EmailTemplate;
const { saveJsonToFile } = utils;

const EMAIL_SUB_DIR = "emailTemplate";
const { CONFIG_SUB_DIR, RAW_SUB_DIR } = utils;
const TARGET_FILENAME = "emailTemplates.json";

const EXPORT_SUBDIR = "emailTemplate";

function splitLangToFile(property, templatePath, templateName, suffix) {
  if (!property) {
    return;
  }

  Object.entries(property).forEach(([language, text]) => {
    const filename = `${templateName}.${language}.${suffix}`;
    fs.writeFileSync(`${templatePath}/${filename}`, text);
    property[language] = {
      "$file": filename
    }
  });
}

function processEmailTemplates(exportDir) {

  const rawDir = `${exportDir}/${RAW_SUB_DIR}/${EMAIL_SUB_DIR}`;
  const targetDir = `${exportDir}/${CONFIG_SUB_DIR}/${EMAIL_SUB_DIR}`;

  const sourceFilename = `${rawDir}/${TARGET_FILENAME}`
  try {
    const data = fs.readFileSync(sourceFilename, 'utf8')
    const templates = JSON.parse(data);
    Object.entries(templates.emailTemplate).forEach(([templateName, template]) => {
      const templatePath = `${targetDir}/${templateName}`;

      if (!fs.existsSync(templatePath)) {
        fs.mkdirSync(templatePath, { recursive: true });
      }

      splitLangToFile(template.html, templatePath, templateName, "html");
      splitLangToFile(template.message, templatePath, templateName, "md");
      if (template.styles) {
          const cssFilename = `${templateName}.css`;
          fs.writeFileSync(`${templatePath}/${cssFilename}`, template.styles);
          template.styles = {
            "$file": cssFilename
          }
      }

      const fileName = `${templatePath}/${templateName}.json`;
      saveJsonToFile(template, fileName);
    });

  } catch (err) {
    console.error(err)
  }
}

async function exportEmailTemplates(exportDir) {
  try {
    const fileDir = `${exportDir}/${RAW_SUB_DIR}/${EMAIL_SUB_DIR}`;
    if (!fs.existsSync(fileDir)) {
      fs.mkdirSync(fileDir, { recursive: true });
    }
    const filePath = `${fileDir}/${TARGET_FILENAME}`;
    await exportEmailTemplatesToFile(filePath);
  } catch (err) {
    console.log(err);
  }
}

module.exports.exportEmailTemplates = exportEmailTemplates;
module.exports.processEmailTemplates = processEmailTemplates;