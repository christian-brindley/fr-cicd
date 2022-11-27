const frodo = require("@rockcarver/frodo-lib");
const utils = require("./utils.js");
const process = require('process');

const { exportAllRawConfigEntities } = frodo.Idm;

const EXPORT_SUBDIR = "idm";

async function exportIdmConfig(exportDir) {
    try {
      await exportAllRawConfigEntities(`${exportDir}/${EXPORT_SUBDIR}`);
    } catch (err) {
      console.log(err);
    }
}

module.exports.exportIdmConfig = exportIdmConfig;