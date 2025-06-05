import BasePage from './base/BasePage.js';

export default class ProductPage extends BasePage{
  elements = {
    // Botón “Add to cart”
    addToCartButton: () => cy.contains('Add to cart'),
    // Nombre del producto (encabezado)
    productName: () => cy.get('.name'),
    // Precio del producto (texto)
    productPrice: () => cy.get('.price-container')
  };

  // Método para añadir al carrito y validar el alert emergente
  addToCart() {
    this.elements.addToCartButton().click();
    // Cuando haces click, aparece un alert con “Product added.”
    cy.on('window:alert', (txt) => {
      expect(txt).to.contains('Product added');
    });
  }

  // Validar que el título sea el esperado
  verifyProductTitle(expectedTitle) {
    this.elements.productName()
      .should('have.text', expectedTitle);
  }
}
