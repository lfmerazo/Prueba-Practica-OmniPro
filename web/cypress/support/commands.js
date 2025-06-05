import HomePage from '../page-objects/HomePage';

const home = new HomePage();

Cypress.Commands.add('loginDemoBlaze', (username, password) => {
    
    home.openLoginModal();
    home.fillLoginForm(username, password);
    home.submitLogin();
});
