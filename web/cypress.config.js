const { defineConfig } = require('cypress');
const webpackPreprocessor = require('@cypress/webpack-preprocessor');
const webpackOptions = require('./cypress/webpack.config.js');

module.exports = defineConfig({
  retries:1,
  e2e: {
    // URL base, para cy.visit('/')
    baseUrl: 'https://demoblaze.com/',

    // Patrón para encontrar tus specs (*.cy.js)
    specPattern: 'cypress/e2e/**/*.cy.js',

    // Archivo de soporte
    supportFile: 'cypress/support/e2e.js',

    // Tamaño desktop
    viewportWidth: 1280,
    viewportHeight: 720,

    // Timeout por defecto para comandos
    defaultCommandTimeout: 8000,

    // Para reportes en Mochawesome
    reporter: 'mochawesome',
    reporterOptions: {
      reportDir: 'cypress/reports/mochawesome-report',
      overwrite: false,
      html: false,
      json: true,
      timestamp: 'mmddyyyy_HHmmss'
    },

    // Hook para conectar CSA a Webpack
    setupNodeEvents(on, config) {
      // Le indicamos a Cypress que use el preprocesador de Webpack
      on('file:preprocessor', webpackPreprocessor({ webpackOptions }));
      return config;
    }
  }
});
