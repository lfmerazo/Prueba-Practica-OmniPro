class ProductsPage {
    get listaProductos() { return $$('android=new UiSelector().resourceId("com.swaglabsmobileapp:id/productName")'); }
    get btnMenu()        { return $('~test-Menu'); }
    get btnCart()        { return $('~test-Cart'); }
    get txtTitle()       { return $('//android.widget.TextView[@text="PRODUCTS"]'); }

    async isPageDisplayed() {
        // Verificar que esté en la página de productos
        return await this.txtTitle.isDisplayed();
    }

    async selectProductByIndex(i) {
        await this.listaProductos[i].click();
    }

    async goToCart() {
        await this.btnCart.click();
    }
}

module.exports = new ProductsPage();
