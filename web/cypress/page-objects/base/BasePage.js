export default class BasePage {
  visit(path) {
    cy.visit(path);
  }

  click(element) {
    element.click();
  }

  type(element, text) {
    element.clear().type(text);
  }

  scrollTo(element) {
    element.scrollIntoView();
  }

  waitForVisible(element, timeout = 8000) {
    element.should('be.visible', { timeout });
  }
}
