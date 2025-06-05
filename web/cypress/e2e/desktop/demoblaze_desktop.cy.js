import HomePage from '@pages/HomePage.js';
import ProductPage from '@pages/ProductPage';
import CartPage from '@pages/CartPage';

const home = new HomePage();
const product = new ProductPage();
const cart = new CartPage();


describe('Demoblaze - pruebas en Desktop', () => {


  beforeEach(() => {
    //Tamaño desktop
    cy.viewport(1280, 720);
    //Ir a la home
    home.visitHome();
  });

  it('1) Login Success en Desktop', () => {
        
    cy.fixture('usuarios.json').then(({ valido }) => {

      cy.loginDemoBlaze(valido.user, valido.password);
      // Validar que el usuario esté logueado, ejemplo: aparece “Welcome <username>”.
      home.verifyLoginSuccess(valido.user);
    });
    
  });

  it('2) Login y Logout en Desktop', () => {
    
    home.openLoginModal();
    cy.fixture('usuarios.json').then(({ valido }) => {
      home.fillLoginForm(valido.user, valido.password);    
      home.submitLogin();

      home.verifyLoginSuccess(valido.user);
      home.logout();
      home.verifyLogoutSuccess();
    });

    
  });

  it('3) Navegar a categoría Laptops y validar listado', () => {
    home.clickCategory('Laptops');
  });

  it('4) Seleccionar un producto y añadir al carrito', () => {
    home.clickCategory('Laptops');
    home.clickProductByName('Sony vaio i5');
    product.verifyProductTitle('Sony vaio i5');
    product.addToCart();
    home.goToCart();
    cart.verifyProductInCart('Sony vaio i5', '790');
  });

  it('5) Eliminar producto del carrito', () => {
    home.clickCategory('Laptops');
    home.clickProductByName('Sony vaio i5');
    product.addToCart();
    home.goToCart();
    cart.deleteProduct('Sony vaio i5');
  });


});
