/// <reference types="cypress" />

import page_paths from "../../fixtures/page_paths.json";

export class GatherPage {
  writeData(element, path) {
    cy.get(element, { timeout: 5000 }).then((text) => {
      let savedData = text.text();
      cy.writeFile(path, { data: savedData });
    });
  }

  compareTwoDatas(firstPath, secondPath) {
    cy.readFile(firstPath).then((str) => {
      const firstResult = str.data;

      cy.readFile(secondPath).then((str) => {
        expect(str.data).to.not.equal(firstResult);
      });
    });
  }
}

export const gather = new GatherPage();
