class CartPage {
    get listaItemsCart() { return $$('android=new UiSelector().resourceId("com.swaglabsmobileapp:id/cartItem")'); }
    get btnCheckout()    { return $('~test-CHECKOUT'); }

    async getNumItemsInCart() {
        // Devuelve cantidad de ítems en el carrito
        const items = await this.listaItemsCart;
        return items.length;
    }

    async clickCheckout() {
        await this.btnCheckout.click();
    }
}

module.exports = new CartPage();
