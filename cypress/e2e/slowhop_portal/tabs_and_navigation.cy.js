/// <reference types="cypress" />

import { NavigationPage } from "../../support/page_objects/navigation.js";
import { Verify } from "../../support/page_objects/verify.js";
import { Actions } from "../../support/page_objects/actions.js";

import page_data from "../../fixtures/page_data.json";
import page_paths from "../../fixtures/page_paths.json";

const navigation = new NavigationPage();
const verify = new Verify();
const action = new Actions();

const holderContainer = "#holder";
const catalogContainer = ".catalog-page";

describe("Tests connected with navigation thourgh tabs inside slowhop portal", () => {
  beforeEach(() => {
    cy.loginToSlowhop();
  });

  it("Navigate through all tabs on navigation bar and check them", () => {
    //Click on places navigation item
    action.clickButton(page_data.navigationTabs.places);

    //Verify where redirection went with confirming url and content
    verify.checkTextAndUrl(
      catalogContainer,
      page_data.catalogTitle,
      page_paths.catalog.dashboard
    );

    //Click on events navigation item
    action.clickButton(page_data.navigationTabs.events);

    //Verify where redirection went with confirming url and content
    verify.checkTextAndUrl(
      ".main-content",
      page_data.eventsSlogan,
      page_paths.catalog.events
    );

    //Click on map navigation item
    action.clickButton(page_data.navigationTabs.map);

    //Verify where redirection went with confirming url and content
    navigation.validateUrl(page_paths.catalog.map);

    //Click on ideas navigation item
    action.clickButton(page_data.navigationTabs.ideas);

    //Verify where redirection went with confirming url and content
    verify.checkTextAndUrl(
      holderContainer,
      page_data.ideasSlogan,
      page_paths.ideas
    );

    //Click on last minute navigation item
    action.clickButton(page_data.navigationTabs.lastMinute);

    //Verify where redirection went with confirming url and content
    verify.checkTextAndUrl(
      catalogContainer,
      page_data.lastMinuteTitle,
      page_paths.last_minute
    );

    //Click on about us navigation item
    action.clickButton(page_data.navigationTabs.aboutUs);

    //Verify where redirection went with confirming url and content
    verify.checkTextAndUrl(
      holderContainer,
      page_data.aboutUsTitle,
      page_paths.about_us
    );

    //Click on Add your offer navigation item
    action.clickButton(page_data.navigationTabs.addYourOffer);

    //Verify where redirection went with confirming url and content
    verify.checkTextAndUrl(
      holderContainer,
      page_data.addYourOfferTitle,
      page_paths.add_your_offer
    );
  });

  it("Change language of slowhop portal", () => {
    //Click on languages options
    action.clickElement(".langs-s__country");

    //Verify modal appears
    verify.chceckTextOnPage(".modal-content", page_data.languageModalTitle);

    //Change language from english to polish
    action.clickElementWithText(".langs-s__lang", "Polski");
    // cy.get(".langs-s__lang").contains(page_data.polish).click();

    //Verify changes
    verify.chceckTextOnPage(holderContainer, "Urlop zaczyna się od");

    //Click on language options
    action.clickElement(".langs-s__country");

    //Verify modal appears
    verify.chceckTextOnPage(".modal-content", "Zmień język");

    //Change langauge from polish to english
    // cy.get(".langs-s__lang").contains(page_data.english).click();
    action.clickElementWithText(".langs-s__lang", "English");

    //Verify changes
    verify.checkTextAndUrl(holderContainer, "Leisure is a state of mind", "/");
  });
});
