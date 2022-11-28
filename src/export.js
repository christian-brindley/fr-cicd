#!/usr/bin/env node

const frodo = require("@rockcarver/frodo-lib");
const emailTemplates = require("./helpers/emailTemplates.js");
const scripts = require("./helpers/scripts.js");
const idm = require("./helpers/idm.js");
const { getTokens } = frodo.Authenticate;
require('dotenv').config();

const { session } = frodo.state.default;
const configDir = "target"; // process.env.CONFIG_DIR;

async function getConfig() {
    await getTokens();
    await emailTemplates.exportEmailTemplates(configDir);
    await scripts.exportScripts(configDir, ["alpha","bravo"]);
    await idm.exportIdmConfig(configDir);
}

session.setTenant(process.env.TENANT_BASE_URL);
session.setUsername(process.env.TENANT_USER);
session.setPassword(process.env.TENANT_PASS);
session.setRealm("alpha");

getConfig();


