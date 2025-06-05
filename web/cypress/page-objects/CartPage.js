import BasePage from './base/BasePage.js';

export default class CartPage extends BasePage{
  elements = {
    // Filas de la tabla del carrito (cada producto es un <tr>)
    cartTableRows: () => cy.get('#tbodyid > tr'),
    // Botón “Place Order”
    placeOrderButton: () => cy.contains('Place Order'),
    // Texto del precio total en carrito
    totalPrice: () => cy.get('#totalp'),
    // Botón de “Delete” para un producto específico
    deleteProductButton: (productName) =>
      cy.get('td').contains(productName).parent().find('a')
  };

  // Verificar que un producto esté en el carrito con el precio correcto
  verifyProductInCart(productName, price) {
    this.elements.cartTableRows()
      .should('contain', productName)
      .and('contain', price);
  }

  // Eliminar un producto del carrito por su nombre
  deleteProduct(productName) {
    this.elements.deleteProductButton(productName).click();
    cy.get('#tbodyid').should('not.contain', 'Sony vaio i5');
  }

  // Hacer click en Place Order
  clickPlaceOrder() {
    this.elements.placeOrderButton().click();
  }

  // Validar que el precio total sea el esperado (por ejemplo “790”)
  verifyTotalPrice(expectedTotal) {
    this.elements.totalPrice()
      .should('have.text', expectedTotal);
  }
}
