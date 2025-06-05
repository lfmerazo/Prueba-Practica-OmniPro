const LoginPage    = require('../pageobjects/login.page');
const ProductsPage = require('../pageobjects/products.page');

describe('Scroll y Girar la pantalla', () => {
    before(async () => {
        await $('~test-Username').waitForDisplayed({ timeout: 5000 });
        await LoginPage.login('standard_user', 'secret_sauce');
        await ProductsPage.txtTitle.waitForDisplayed({ timeout: 5000 });
    });

    it('Verificar hacer scroll en la lista de productos', async () => {
        const uiScrollCommand =
            'new UiScrollable(new UiSelector().scrollable(true)).scrollIntoView(' +
            'new UiSelector().text("Sauce Labs Onesie")' +
            ')';
        const productoOnesie = await $(`android=${uiScrollCommand}`);
        await productoOnesie.waitForDisplayed({ timeout: 5000 });
        await expect(productoOnesie).toBeDisplayed();

        //para forzar un fallo (pruebas)
        //expect(false).toBe(true);
    });
    

});
