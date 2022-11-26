const frodo = require("@rockcarver/frodo-lib");
const utils = require("./utils.js");
const fs = require("fs");

const { listEmailTemplates } = frodo.EmailTemplate;
const { saveJsonToFile } = utils;

const EMAIL_TEMPLATE_TYPE = "emailTemplate";

function getFileDataTemplate() {
  return {
    meta: {},
    emailTemplate: {},
  };
}

async function exportEmailTemplatesToFiles(exportDir) {
  try {
    const fileDir = `${exportDir}/${EMAIL_TEMPLATE_TYPE}`;
    if (!fs.existsSync(fileDir)){
      fs.mkdirSync(fileDir, { recursive: true });
    }
    const templates = await listEmailTemplates();
    templates.forEach((template) =>  {
      const templateId = template._id.replace(`${EMAIL_TEMPLATE_TYPE}/`, '');
      const fileName = `${fileDir}/${templateId}.json`;
      const fileData = getFileDataTemplate();
      console.log(`Exporting ${fileName}`);
      fileData.emailTemplate[templateId] = template;
      saveJsonToFile(fileData, fileName);
    });
  } catch (err) {
    console.log(err);
  }
}

module.exports.exportEmailTemplatesToFiles = exportEmailTemplatesToFiles;