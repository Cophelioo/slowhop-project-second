/// <reference types="cypress" />

export class Actions {
  clickButton(text) {
    cy.contains("a", text).click();
  }

  clickSubmit() {
    cy.get("form").submit();
  }

  clickElement(element) {
    cy.get(element).should("be.visible").click();
  }

  clickFirstElement(element) {
    cy.get(element).first().should("be.visible").click();
  }

  clickElementWithText(element, text) {
    cy.get(element).contains(text).should("be.visible").click();
  }

  clickPagination(numberOfPage) {
    cy.contains(".results-pagination__link", numberOfPage).click();
  }

  fillForm(element, text) {
    let i = 0;
    element.forEach((element) => {
      cy.get(element).clear();
      cy.get(element).should("be.visible").type(text[i]);
      i++;
    });
  }

  fillOneSelect(element, text) {
    cy.get(element).clear();
    cy.get(element).should("be.visible").type(text);
  }

  clearChosenSelect(element) {
    cy.get(element).clear();
  }

  selectOption(element, text, value) {
    cy.get(element).select(text).should("have.value", value);
  }

  selectOptionWithoutValue(element, text) {
    cy.get(element).select(text).should("be.visible");
  }

  checkCheckbox(element) {
    cy.get(element).check({ force: true }).should("be.checked");
  }

  uncheckCheckbox(element) {
    cy.get(element).uncheck({ force: true }).should("not.be.checked");
  }
}

export const action = new Actions();
