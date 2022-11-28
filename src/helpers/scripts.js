const frodo = require("@rockcarver/frodo-lib");
const utils = require("./utils.js");
const fs = require("fs");
const process = require('process');

const { exportScriptsToFile } = frodo.Script;
const { session } = frodo.state.default;
const { CONFIG_SUB_DIR, RAW_SUB_DIR } = utils;

const SCRIPT_SUB_DIR = "script";

async function exportScripts(exportDir, realms) {
  for (const realm of realms) {
    session.setRealm(realm);
    try {
      const fileDir = `${exportDir}/${RAW_SUB_DIR}/${SCRIPT_SUB_DIR}`;
      if (!fs.existsSync(fileDir)) {
        fs.mkdirSync(fileDir, { recursive: true });
      }
      const filePath = `${fileDir}/${realm}.json`;
      await exportScriptsToFile(filePath);
    } catch (err) {
      console.log(err);
    } 
  }
}

module.exports.exportScripts = exportScripts;