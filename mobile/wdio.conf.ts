import type { Options } from '@wdio/types';
import { mkdirSync, existsSync } from 'fs';
import { resolve } from 'path';
import AllureReporter, { addAttachment } from '@wdio/allure-reporter';

exports.config = {
    runner: 'local',
    port: 4723,
    specs: [
        './test/specs/**/*.js'
    ],
    maxInstances: 1,

    reporters: [
    'spec',
    ['allure', {
      outputDir: './reports/allure-results',
      disableWebdriverStepsReporting: false,
      disableWebdriverScreenshotsReporting: false,
      addConsoleLogs: true,
    }],
    ['mochawesome', {
      outputDir: './reports/mochawesome',
      outputFileFormat: (opts: { cid: string }) => `mochawesome-${opts.cid}.json`
    }]
  ],

  /**
   * afterTest hook: se dispara **después** de cada test (pase o falle).
   *  
   * Los parámetros que recibe son:
   *  - test: objeto con { title, parent, etc. }
   *  - _context: generalmente no se usa (por eso lo _otlizamos con guión)
   *  - { error, result, duration, passed, retries }: estado final del test
   */
  afterTest: async (
    test: any, 
    _context: any, 
    { error, result, duration, passed, retries }: any
  ) => {
    // Solo tomamos captura si el test falló
    if (!passed) {
      // 1) Creamos la ruta a la carpeta de screenshots (si no existe)
      const screenshotsDir = resolve(process.cwd(), 'reports', 'screenshots');
      if (!existsSync(screenshotsDir)) {
        mkdirSync(screenshotsDir, { recursive: true });
      }

      // 2) Definimos un nombre único para la imagen
      //    - test.parent es el “suite” o carpeta donde está el spec
      //    - test.title es el nombre del it(“...”) (titulo del test)
      //    - timestamp para evitar sobreescrituras
      const timestamp = new Date().toISOString().replace(/:/g, '-');
      const safeTestName = test.title.replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_]/g, '');
      const safeSuiteName = (test.parent ?? 'unknown_suite').replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_]/g, '');
      const fileName = `${safeSuiteName}--${safeTestName}--${timestamp}.png`;

      // 3) Tomamos la captura usando el comando de WebdriverIO
      //    Esta llamada retorna un Buffer, que WDIO convierte en un .png
      await browser.saveScreenshot(resolve(screenshotsDir, fileName));

      //4) Adjuntar automáticamente este screenshot dentro del reporte Allure, puedes hacerlo así:
       
      const imageBuffer = await browser.takeScreenshot();
      await AllureReporter.addAttachment(`Falló: ${test.title}`, Buffer.from(imageBuffer, 'base64'), 'image/png');
       
           
    }
  },

    capabilities: [
    {
      platformName: 'Android',
      'appium:deviceName': 'emulator-5554',       // tu AVD corriendo (ej. Pixel_4_API_33 -> emulator-5554)
      'appium:platformVersion': '13.0',           // o ‘13’ según tu emulador
      'appium:automationName': 'UiAutomator2',
      'appium:app': './app/SwagLabs.apk',
      'appium:appPackage': 'com.swaglabsmobileapp',
      'appium:appActivity': 'com.swaglabsmobileapp.SplashActivity',
      maxInstances: 1
    }
  ],

    outputDir: './reports/logs',      // aquí van los logs de WDIO y Appium
    logLevel: 'info',
    bail: 0,
    baseUrl: '',
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 1,
    services: ['appium'],
    framework: 'mocha',
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    },
  
}
