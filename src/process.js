#!/usr/bin/env node

const emailTemplates = require("./helpers/emailTemplates.js");
const scripts = require("./helpers/scripts.js");
const idm = require("./helpers/idm.js");

const configDir = "target";

function processConfig() {
    idm.processIdmConfig(configDir);
    emailTemplates.processEmailTemplates(configDir);
}

processConfig();


