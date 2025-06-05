import BasePage from './base/BasePage.js';

export default class HomePage extends BasePage{
  elements = {   
    //Campo de texto de username
    userField: () => cy.get('#loginusername'),
    //Campo de texto de password
    passField: () => cy.get('#loginpassword'),
    // Label para validar login exitoso, muestra el texto “Welcome <user>”
    userNameLabel: () => cy.get('#nameofuser'),
    // Botón para realizar el login
    confirmLoginButton: () => cy.get('button').contains('Log in'),
    // Botón Log in en el menú, abrir formulario de login
    loginButton: () => cy.get('#login2'),
    // Botón Log out en el menú, cerrar sesiòn
    logoutButton: () => cy.get('#logout2'),

    // Links de los títulos de cada tarjeta de producto
    productLinks: () => cy.get('.card-title a'),
    // Botón para ir al carrito
    cartButton: () => cy.get('#cartur'),
    // Botón hamburguesa que en móvil despliega el menú
    burgerButton: () => cy.get('button.navbar-toggler')   
  };
  

  // Navegar a la home de demoblaze (https://demoblaze.com/)
  visitHome() {
    this.visit('/');
  }

  openLoginModal() {
    this.elements.loginButton().click();
  }

  fillLoginForm(username, password) {
    this.elements.userField().clear().type(username).should('have.value', username);
    this.elements.passField().clear().type(password).should('have.value', password);
  }

  submitLogin() {
    this.elements.confirmLoginButton().click();
  }

  verifyLoginSuccess(username){
    this.waitForVisible(this.elements.userNameLabel());
    this.elements.userNameLabel().should('contain',`Welcome ${username}`);
  }

  logout() {
    this.elements.logoutButton().click();
  }

  verifyLogoutSuccess(username){
    // Verificar que ya aparece botón “Log in” otra vez:
    this.waitForVisible(this.elements.loginButton());
    this.elements.loginButton().should('be.visible');
  }

  // Hacer click en una categoría por nombre (“Laptops”, “Monitors”, etc.)
  clickCategory(categoryName) {
    //Esperar a que haya por lo menos 1 <a id="itemc"> visible
    cy.get('#itemc')
      .should('have.length.at.least', 1)
      .and('be.visible');

    cy.contains('#itemc', categoryName)
      .scrollIntoView()
      .should('be.visible')
      .click();
  }

  // Hacer click en un producto específico por su nombre exacto
  clickProductByName(name) {
    this.elements.productLinks()
      .contains(name)
      .scrollIntoView()
      .click();
  }

  // Ir al carrito
  goToCart() {
    this.elements.cartButton().click();
  }
}
