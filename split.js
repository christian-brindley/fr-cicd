#!/usr/bin/env node

const fs = require('fs')
const filename = "/Users/christian.brindley/cicd/fr-config/idm/managed.json";
const outputdir = "/tmp/split";
const utils = require("./src/helpers/utils.js");
const { saveJsonToFile } = utils;

console.log("Processing", filename);

try {
  const data = fs.readFileSync(filename, 'utf8')
  const managedObjects = JSON.parse(data);
  managedObjects.objects.forEach(managedObject => {
    const objectPath = `${outputdir}/${managedObject.name}`;
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

