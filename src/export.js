#!/usr/bin/env node

const frodo = require("@rockcarver/frodo-lib");
const emailTemplates = require("./helpers/emailTemplates.js");
const { getTokens } = frodo.Authenticate;
require('dotenv').config();

const { session } = frodo.state.default;
const configDir = process.env.CONFIG_DIR;

async function getConfig() {
    await getTokens();
    await emailTemplates.exportEmailTemplatesToFiles(configDir);
}

session.setTenant(process.env.TENANT_BASE_URL);
session.setUsername(process.env.TENANT_USER);
session.setPassword(process.env.TENANT_PASS);
session.setRealm("alpha");

getConfig();


