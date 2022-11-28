const fs = require("fs");
const slugify = require("slugify");
const frodo = require("@rockcarver/frodo-lib");

const CONFIG_SUB_DIR = "platform-config";
const RAW_SUB_DIR = "raw";

function getTypedFilename(name, type, suffix = 'json') {
  const slug = slugify(name.replace(/^http(s?):\/\//, ''));
  return `${slug}.${type}.${suffix}`;
}

/**
 * Save JSON object to file
 * @param {Object} data data object
 * @param {String} filename file name
 */
function saveJsonToFile(data, filename) {
  fs.writeFile(filename, JSON.stringify(data, null, 2), (err) => {
    if (err) {
      console.error(`ERROR - can't save ${filename}`);
    }
    return '';
  });
}

function saveToFile(type, data, identifier, filename) {
  const exportData = {};
  exportData['meta'] = getMetadata();
  exportData[type] = {};

  if (Array.isArray(data)) {
    data.forEach((element) => {
      exportData[type][element[identifier]] = element;
    });
  } else {
    exportData[type][data[identifier]] = data;
  }
  fs.writeFile(filename, JSON.stringify(exportData, null, 2), (err) => {
    if (err) {
      return printMessage(`ERROR - can't save ${type} to file`, 'error');
    }
    return '';
  });
}

module.exports.saveJsonToFile = saveJsonToFile;
module.exports.getTypedFilename = getTypedFilename;
module.exports.CONFIG_SUB_DIR = CONFIG_SUB_DIR;
module.exports.RAW_SUB_DIR = RAW_SUB_DIR;