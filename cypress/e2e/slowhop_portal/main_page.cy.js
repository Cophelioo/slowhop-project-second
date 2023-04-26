/// <reference types="cypress" />

import { Verify } from "../../support/page_objects/verify.js";
import { Actions } from "../../support/page_objects/actions.js";
import page_data from "../../fixtures/page_data.json";
import page_paths from "../../fixtures/page_paths.json";

const verify = new Verify();
const action = new Actions();

const mainPageContainer = "#container";

/**
 * I could move button clicking and checking places to function to make less code but I thought that code could be not that well readable
 */
describe("Tests that are checking working of slowhop portal main page", () => {
  beforeEach(() => {
    cy.loginToSlowhop();
  });

  it("Check buttons on main page", () => {
    //First button redirecting in slowhop catalog
    action.clickButton(page_data.exploreButtonName);
    verify.checkTextAndUrl(
      ".catalog-page",
      page_data.catalogTitle,
      page_paths.catalog.dashboard
    );
    cy.go(-1);
    verify.checkTextAndUrl(mainPageContainer, page_data.mainTitle, "/");

    //Second button also redirecting in slowhop catalog
    action.clickButton(page_data.sleepingButtonName);
    verify.checkTextAndUrl(
      ".catalog-page",
      page_data.catalogTitle,
      page_paths.catalog.dashboard
    );
    cy.go(-1);
    verify.checkTextAndUrl(mainPageContainer, page_data.mainTitle, "/");

    //Third button is moving user to event/adventure page in slowhop catalog
    action.clickButton(page_data.tripButtonName);
    verify.checkTextAndUrl(
      "#search--filters-bar",
      page_data.eventFilter,
      page_paths.catalog.events
    );
    cy.go(-1);
    verify.checkTextAndUrl(mainPageContainer, page_data.mainTitle, "/");

    //Fourth button is moving user to catalog with already provided filters
    action.clickButton(page_data.workationButtonName);
    verify.checkTextAndUrl(
      ".catalog-page",
      page_data.catalogTitle,
      page_paths.catalog.dashboard + "?workation_type=solo,groups"
    );

    //Checking tags that are already provided inside filters
    cy.get(".search-tags").then((tags) => {
      expect(tags.text())
        .to.contain(page_data.remoteTag)
        .and.contain(page_data.workingGroupTag);
    });
    cy.go(-1);
    verify.checkTextAndUrl(mainPageContainer, page_data.mainTitle, "/");
  });

  it("Check first item on Popular list, take its name and generated url redirection and check it", () => {
    cy.get(".gallery-item")
      .first()
      .then((place) => {
        const placeName = place.text();
        const href = place.attr("href").substring(3);
        //Removing attribute from an element to open a page in the same page not in new window
        cy.wrap(place).invoke("removeAttr", "target").click();
        verify.checkTextAndUrl(place, placeName, href);
      });
    cy.go(-1);
    verify.checkTextAndUrl(mainPageContainer, page_data.mainTitle, "/");

    //Check the "All places" button under Popular places
    action.clickButton("All places");

    verify.checkTextAndUrl(
      ".catalog-page",
      page_data.catalogTitle,
      page_paths.catalog.dashboard
    );
    cy.go(-1);
    verify.checkTextAndUrl(mainPageContainer, page_data.mainTitle, "/");
  });

  it("Check validation on inbox input inside main page dom", () => {
    cy.get("#newsletter-section").then((section) => {
      expect(section).to.contain(page_data.inboxTitle);
    });

    action.clickButton(page_data.inboxButtonName);

    cy.get(".sweet-alert").then((win) => {
      expect(win).to.contain("Error").and.to.contain("OK");
      cy.wrap(win).find(".confirm").click();
    });
  });
});
