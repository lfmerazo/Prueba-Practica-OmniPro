# Prueba-Practica-OmniPro
Proyecto de automatización Web y Móvil usando cypress y Appium

Puedes descargar el proyecto de manera individual:
    Web:    https://github.com/lfmerazo/Proyecto-Web-Cypress.git
    Móvil:  https://github.com/lfmerazo/Proyecto-Mobile-Appium.git

# Pruebas de Automatización - Aplicación Web (Demoblaze)
## Instrucciones de Instalación y Ejecución - Aplicación Web

Este repositorio contiene la suite de pruebas automatizadas para la tienda Demoblaze (https://demoblaze.com/)
utilizando Cypress (web) y una estructura POM (Page Object Model).

    1. Pre-requisitos

    - Node.js
    - npm
    - git

    2. Clonar y Configurar el Proyecto

        2.1. Abre tu terminal o consola y ubícate en la carpeta donde quieras clonar el repositorio.  
        2.2. Clona el repositorio público de GitHub:
    
            > git clone https://github.com/lfmerazo/Proyecto-Web-Cypress.git

        2.3. Accede a la carpeta    
            > cd QA-Automation-Demoblaze/web

        2.4. Instalar Dependencias

            > npm install

            Se instalaran dependencia de:
                - cypress
                - @cypress/webpack-preprocessor
                - babel-loader, @babel/core, @babel/preset-env
                - webpack, webpack-cli
                - mochawesome, mochawesome-merge, mochawesome-report-generator

        2.5. Ejecutar pruebas

            2.5.1 Ejecutar pruebas en modo interactivo
                > npm run cypress:open
            2.5.2 Ejecutar las Pruebas en Headless y Generar Reporte
                > npm run test-and-report # Headless + reporte Mochawesome

            Este script realiza tres pasos consecutivos:

                > npm run cypress:run
                – Corre todas las pruebas en modo headless (Chrome) y genera archivos JSON de Mochawesome en cypress/reports/mochawesome-report/*.json.

                > npm run merge-reports
                – Combina todos los JSON de mochawesome-report en un solo archivo output.json.
                ruta: mochawesome-merge cypress/reports/mochawesome-report/*.json > cypress/reports/mochawesome-report/output.json

    3. Tecnologías Utilizadas

        Cypress 14.4.0
            Framework de testing End-to-End para aplicaciones web, que corre dentro de Chrome/Electron.

        Page Object Model (POM)
            Patrón de diseño que separa la lógica de los tests de la lógica de acceso a la UI.
            Cada página “Home”, “Product”, “Cart” tiene su propia clase con selectores y métodos.

        Webpack + Babel
            @cypress/webpack-preprocessor, babel-loader, @babel/preset-env → permiten usar ES Modules (import/export) y alias de rutas (@pages, @fixtures, @support) dentro de los tests.
            Simplifica la lectura de importaciones y mantiene el código limpio.

        Mochawesome
            Generador de reportes en formato JSON y HTML a partir de la ejecución de Cypress.
            Se usa en conjunción con mochawesome-merge y mochawesome-report-generator para un reporte final único.

        Node.js y npm
            Node ejecuta los scripts y Babel.
            npm administra las dependencias (Cypress, Babel, Webpack, Mochawesome, etc.).

    4. Justificación de Elección de Plataforma/App
        Demoblaze (https://demoblaze.com/)
        Es una aplicación de ejemplo pública y gratuita para e-commerce.
        Permite simular flujos reales:
            - Navegar por categorías (Phones, Laptops, Monitors).
            - Seleccionar un producto y ver su detalle.
            - Agregar el producto al carrito y validar precios.
            - Eliminar productos del carrito.
        Fácil de acceder y sin credenciales exigentes, ideal para demostraciones de POC.

# Pruebas de Automatización - Aplicación Móvil (SwagLabs)
## Instrucciones de Instalación y Ejecución - Aplicación Móvil

Este repositorio contiene las pruebas de automatización para la aplicación móvil **SwagLabs.apk** utilizando **WebdriverIO + Appium**.  
A continuación se detalla la estructura, cómo instalar y ejecutar, tecnologías empleadas y justificación de la elección de la app.

    1. Pre-requisitos

    - Node.js
    - npm
    - git

    2. Clonar y Configurar el Proyecto

        2.1. Abre tu terminal o consola y ubícate en la carpeta donde quieras clonar el repositorio.  
        2.2. Clona el repositorio público de GitHub:
    
            > git clone https://github.com/lfmerazo/Proyecto-Mobile-Appium.git

        2.3. Accede a la carpeta    
            > cd QA-Automation-SwagLabs/mobile

        2.4. Instalar Dependencias

            > npm install

            Revisar configuración de Appium (opcional)

                Si ya tienes Appium instalado globalmente, recuerda abrir una sesión antes de ejecutar los tests                
                Si no, al usar el servicio de Appium integrado con WebdriverIO, no necesitas arrancarlo a mano; wdio.conf.ts lo iniciará automáticamente.

            Aplicación bajo prueba

                El archivo SwagLabs.apk ya está dentro de app/. Si quisieras usar otro APK o versión:
                Reemplaza app/SwagLabs.apk con tu nuevo .apk.
                Asegúrate de mantener el mismo nombre o actualizar el path en wdio.conf.ts (opción app: 'app/SwagLabs.apk').

        2.5. Ejecutar pruebas

            > npm run test:mobile
            
            Esto realiza:
                Arranca Appium automáticamente (puerto por defecto configurado en wdio.conf.ts).
                Ejecuta todos los archivos .spec.js de test/specs/*.
                Va generando logs en reports/logs/wdio-*.log y capturas automáticas en reports/screenshots/ si un test falla.
                Crea resultados “raw” para los reporteros Allure y Mochawesome en reports/allure-results/ y reports/mochawesome/ respectivamente.

        2.6 Generar y abrir reporte Allure
            Una vez finalizada la ejecución:
                > npm run allure:generate
                > npm run allure:open

            Generar reporte HTML de Mochawesome
            > npm run mochawesome:report

            Esto combina todos los JSON que generó cada worker (mochawesome-0-0.json, mochawesome-0-1.json, etc.) en un solo combined.json.
            Luego crea la carpeta reports/mochawesome/html/ con un index.html. Ábrelo en el navegador para ver tests, tiempos, capturas (si agregaste contexto) y más.

    3. Tecnologías Utilizadas

        WebdriverIO (v7+)
            Framework de WebDriver en JavaScript/TypeScript con integración nativa de Appium.
            Facilita la configuración de múltiples workers, reporters y hooks.
        Appium
            Motor de automatización para aplicaciones móviles (Android / iOS).
            En este caso solo Android (archivo APK).

        Node.js / NPM
            Para gestión de dependencias y ejecución de scripts.

        TypeScript
            La configuración de WDIO se hace en wdio.conf.ts.
            Permite tipado estático en hooks y mayor autocompletado.

        Mocha (runner por defecto de WebdriverIO)
            Estructura de tests (describe / it).
            Se extiende con chai para aserciones.

        Chai (librería de aserciones)
            Estilo “BDD” (expect, should).

        Allure Reporter
            Genera resultados para Allure (adjuntos, pasos, pantallazos).
            Carpeta de salida: reports/allure-results/.

        Mochawesome
            Reporter alternativo para obtener un dashboard HTML con todos los resultados.
            Output JSON: reports/mochawesome/*.json; HTML final en reports/mochawesome/html/.

        mochawesome-merge + marge
            Utility para combinar múltiples JSON de Mochawesome en uno solo y luego generar el HTML (herramienta marge).

        fs / path (módulos nativos de Node)
            Para crear carpetas (mkdirSync), resolver rutas absolutas (path.resolve), verificar existencia de folder (existsSync) y salvar capturas de pantalla.

    4. Justificación de Elección de Plataforma/App
       
       SwagLabs.apk

            Es una aplicación de e-commerce de ejemplo muy popular para demos de Appium.
            Contiene flujos típicos de login, listado de productos, scroll y agregar al carrito, lo cual permite demostrar la mayor parte de acciones móviles (findByAccessibilityId, scroll nativo con UiScrollable, etc.).    
            Está disponible públicamente.

        Android
            Es una herramienta que permite emular e instalar apps sin necesidad de certificados.
            App de uso gratuito 
            Tengo un dispositivo móvil con Android
