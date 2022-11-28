const frodo = require("@rockcarver/frodo-lib");
const utils = require("./utils.js");
const fs = require("fs");
const process = require('process');

const { exportScriptsToFiles } = frodo.Script;
const { session } = frodo.state.default;

const SCRIPT_TYPE = "script";

async function exportScripts(exportDir, realms) {
  for (const realm of realms) {
    session.setRealm(realm);
    const wd = process.cwd();
    try {
      const fileDir = `${exportDir}/${SCRIPT_TYPE}/${realm}`;
      if (!fs.existsSync(fileDir)) {
        fs.mkdirSync(fileDir, { recursive: true });
      }
      process.chdir(fileDir);
      await exportScriptsToFiles();
    } catch (err) {
      console.log(err);
    }
    process.chdir(wd);
  }
}

module.exports.exportScripts = exportScripts;