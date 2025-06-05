class LoginPage {
    // Elementos de Login Page
    get inputUsername() { return $('~test-Username'); }
    get inputPassword() { return $('~test-Password'); }
    get btnLogin()     { return $('~test-LOGIN'); }
    get txtErrorMsg()  { return $('android=new UiSelector().text("Username and password do not match any user in this service.")');}
    
    async open() {
       // Abre la aplicación
    }

    async login(username, password) {
        await this.inputUsername.setValue(username);
        await this.inputPassword.setValue(password);
        await this.btnLogin.click();
    }

    async getErrorMessage() {
        return this.txtErrorMsg.getText();
    }
   
}

module.exports = new LoginPage();
