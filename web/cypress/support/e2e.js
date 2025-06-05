// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Importamos el archivo commands.js para tener todos los comandos personalizados disponibles
import './commands';

// (Opcional) Para capturar automáticamente una captura de pantalla cuando falle un test, 
// podemos usar el siguiente listener. Cypress, por defecto, ya saca screenshots al fallar, 
// pero aquí puedes extender ese comportamiento si lo quieres más detallado:
Cypress.on('test:after:run', (test, runnable) => {
  if (test.state === 'failed') {
    const screenshotFileName = `${runnable.parent.title} -- ${test.title} (failed).png`;
    cy.screenshot(screenshotFileName, { capture: 'runner' });
  }
});
