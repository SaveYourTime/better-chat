/// <reference types="cypress" />

const admin = require('firebase-admin');
const cypressFirebasePlugin = require('cypress-firebase').plugin;
const { GoogleSocialLogin } = require('cypress-social-logins').plugins;

/**
 * @type {Cypress.PluginConfig}
 */
module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
  on('task', { GoogleSocialLogin });

  const extendedConfig = cypressFirebasePlugin(on, config, admin);
  return extendedConfig;
};
