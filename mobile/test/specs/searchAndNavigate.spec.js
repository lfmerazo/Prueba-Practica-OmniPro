const LoginPage    = require('../pageobjects/login.page');
const ProductsPage = require('../pageobjects/products.page');
const CartPage     = require('../pageobjects/cart.page');

describe('Agre item al carrito', () => {
    before(async () => {
        await $('~test-Username').waitForDisplayed({ timeout: 5000 });
        await LoginPage.login('standard_user', 'secret_sauce');
        await ProductsPage.txtTitle.waitForDisplayed({ timeout: 5000 });
    });

    it('Verificar el agregar un producto al carrito', async () => {
        const tituloProducts = await $('//android.widget.TextView[@text="PRODUCTS"]');
        await tituloProducts.waitForDisplayed({ timeout: 5000 });
        await expect(tituloProducts).toBeDisplayed();

        const btnAddBackpack = await $('~test-ADD TO CART');
        await btnAddBackpack.waitForEnabled({ timeout: 5000 });
        await btnAddBackpack.click();

        const iconoCarrito = await $('~test-Cart');
        await iconoCarrito.waitForDisplayed({ timeout: 5000 });
        await expect(iconoCarrito).toBeDisplayed();
    });
});
