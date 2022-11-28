const frodo = require("@rockcarver/frodo-lib");
const utils = require("./utils.js");
const process = require('process');
const fs = require('fs');

const { exportAllRawConfigEntities } = frodo.Idm;
const { saveJsonToFile } = utils;


const EXPORT_SUBDIR = "idm";
const { CONFIG_SUB_DIR, RAW_SUB_DIR } = utils;

// Split managed.json into separate objects, each with separate scripts

function processManaged(sourceDir, targetDir) {
  const sourceFilename = `${sourceDir}/managed.json`
  try {
    const data = fs.readFileSync(sourceFilename, 'utf8')
    const managedObjects = JSON.parse(data);
    managedObjects.objects.forEach(managedObject => {
      const objectPath = `${targetDir}/managed/${managedObject.name}`;
      const scriptsSubdir = "scripts";
  
      if (!fs.existsSync(`${objectPath}/${scriptsSubdir}`)) {
        fs.mkdirSync(`${objectPath}/${scriptsSubdir}`, { recursive: true });
      }
  
      Object.entries(managedObject).forEach(
        ([key, value]) => {
          if (value.type && (value.type === "text/javascript") && value.source) {
            const scriptFilename = `${scriptsSubdir}/${managedObject.name}.${key}.js`;
            value.file = scriptFilename;
            fs.writeFileSync(`${objectPath}/${scriptFilename}`, value.source);
            delete value.source;
          }
        }
      );
  
      const fileName = `${objectPath}/${managedObject.name}.json`;
      console.log("Saving object", fileName);
      saveJsonToFile(managedObject, fileName);
    });
  } catch (err) {
    console.error(err)
  }
}

// Reformat IDM config

function postProcess(sourceDir, targetDir) {
    processManaged(sourceDir, targetDir);
}

// Entry point

async function exportIdmConfig(exportDir) {
    try {
      const rawDir = `${exportDir}/${RAW_SUB_DIR}/${EXPORT_SUBDIR}`;
      const targetDir = `${exportDir}/${CONFIG_SUB_DIR}/${EXPORT_SUBDIR}`;
      if (!fs.existsSync(rawDir)) {
        fs.mkdirSync(rawDir, { recursive: true });
      }
      await exportAllRawConfigEntities(rawDir);
      postProcess(rawDir, targetDir);
    } catch (err) {
      console.log(err);
    }
}

module.exports.exportIdmConfig = exportIdmConfig;