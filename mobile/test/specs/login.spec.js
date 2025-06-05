const LoginPage    = require('../pageobjects/login.page');
const ProductsPage = require('../pageobjects/products.page');

describe('Flujos de login en Swag Labs', () => {
    beforeEach(async () => {

        /// 1) Cerrar la app por completo (matar el proceso)
        await driver.terminateApp('com.swaglabsmobileapp');
        // 2) Volver a abrirla (activatedApp la “lanza” en su activity principal)
        await driver.activateApp('com.swaglabsmobileapp');

       await $('~test-Username').waitForDisplayed({ timeout: 5000 });
       
    });

    it('Verificar inicio de sesión con credenciales válidas', async () => {
        const usrValid = 'standard_user';
        const passValid  = 'secret_sauce';    

        await LoginPage.login(usrValid, passValid);
        await ProductsPage.txtTitle.waitForDisplayed({ timeout: 5000 });
        await expect(ProductsPage.txtTitle).toBeDisplayed();
    });
    
    it('Verificar mensaje error en login con credenciales inválidas', async () => {
        const usrInvalid = 'wrong_user';
        const passInvalid  = 'wrong_pass';

        // Asegurarnos de que el campo Username esté listo
        await $('~test-Username').waitForDisplayed({ timeout: 5000 });

        await LoginPage.login(usrInvalid, passInvalid);

        const errorMsg = await LoginPage.getErrorMessage();
        expect(errorMsg).toContain('Username and password do not match any user in this service.'); // texto que la app muestra
    });
});
