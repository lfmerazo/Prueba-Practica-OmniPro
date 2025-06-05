import HomePage    from '@pages/HomePage';
import ProductPage from '@pages/ProductPage';
import CartPage    from '@pages/CartPage';

const miHomePage = new HomePage();
const miProductPage = new ProductPage();
const miCartPage = new CartPage();

describe('Demoblaze - pruebas en modo responsive (mobile view)', () => {
  beforeEach(() => {
    // Simular iPhone X
    cy.viewport('iphone-x');
    miHomePage.visitHome();
  });

  it('Verificar Login y Logout en Mobile View', () => {
    cy.fixture('usuarios.json').then(({ valido }) => {
      cy.loginDemoBlaze(valido.user, valido.password);

      // Validar que el usuario esté logueado, p. ej. que “Welcome <username>” aparezca.
      miHomePage.verifyLoginSuccess(valido.user);
    });
   
    miHomePage.logout();
    miHomePage.verifyLogoutSuccess();
  });
  
  it('Verificar navegación responsive en categoría Monitors', () => {
    
    miHomePage.clickCategory('Monitors');    
    // En mobile el layout cambia; validamos que algún título de tarjeta muestre “Monitor”
    cy.get('.col-lg-4 .card-title').should('contain.text', 'monitor');
  });

  it('Verificar que se agregue un producto al carrito', () => {

    // Desplegar menú y hacer clic en categoría “Monitors”
    miHomePage.clickCategory('Monitors');

    // Buscar la tarjeta “Apple monitor 24” y la clickeamos
    cy.get('.card-title')
        .contains('Apple monitor 24')
        .scrollIntoView()
        .click();
        
    // Validar que el título de la página sea “Apple monitor 24”
    miProductPage.verifyProductTitle('Apple monitor 24');

    // Dar click en “Add to cart” y capturamos el alert de confirmación
    miProductPage.addToCart();

    // Ir al carrito
    miHomePage.goToCart();

    // Verificar que el carrito contenga “Apple monitor 24” con precio “400”
    miCartPage.verifyProductInCart('Apple monitor 24', '400');
  });

  it('Verificar scroll vertical para ver producto inferior', () => {
        cy.contains('Sony Xperia Z5').scrollIntoView().should('be.visible');
  }); 

});
