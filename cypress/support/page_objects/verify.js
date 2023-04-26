/// <reference types="cypress" />

import { NavigationPage } from "./navigation.js";

const navigation = new NavigationPage();

export class Verify {
  checkTextAndUrl(element, text, url) {
    cy.get(element).then((currentPlace) => {
      expect(currentPlace.text()).to.contain(text);
      navigation.validateUrl(url);
    });
  }

  chceckTextOnPage(element, text) {
    cy.get(element).contains(text);
  }

  checkTextsOnPage(element, text) {
    text.forEach((text) => {
      cy.get(element).then((it) => {
        expect(it.text()).to.contain(text);
      });
    });
  }

  checkExpectInputIsEmpty(element) {
    cy.get(element).should("have.value", "");
  }

  checkFormValues(element, value) {
    let i = 0;
    element.forEach((element) => {
      cy.get(element).should("have.value", value[i]);
      i++;
    });
  }

  checkHideElementAppears(element, text) {
    cy.get(element).should("have.css", "display", "inline", { timeout: 5000 });
    cy.get(element).contains(text, { timeout: 5000 });
  }

  checkAccountName(name) {
    cy.get(".container-fluid").should("contain", name);
  }
}

export const verify = new Verify();
