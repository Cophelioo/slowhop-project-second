/// <reference types="cypress" />

import { NavigationPage } from "../../support/page_objects/navigation.js";
import { Verify } from "../../support/page_objects/verify.js";
import { Actions } from "../../support/page_objects/actions.js";
import { faker } from "@faker-js/faker";
import { GatherPage } from "../../support/page_objects/gather";
import { DatepickerPage } from "../../support/page_objects/datapicker.js";

import page_data from "../../fixtures/page_data.json";
import page_paths from "../../fixtures/page_paths.json";

const navigation = new NavigationPage();
const verify = new Verify();
const action = new Actions();
const gather = new GatherPage();
const datepicker = new DatepickerPage();

const uniquePlacesCounter = ".grid-results__counter";

describe("Tests connected with process of booking and filters", () => {
  beforeEach(() => {
    cy.loginToSlowhop();
  });

  it.only("Check filters in catalog", () => {
    const uniquePlacesFirstNumber = page_paths.first_gathered_data_file;
    const uniquePlacesSecondNumber = page_paths.second_gathered_data_file;

    //Click explore and book on main page
    action.clickButton(page_data.exploreButtonName);
    verify.checkTextAndUrl(
      ".catalog-page",
      page_data.catalogTitle,
      page_paths.catalog.dashboard
    );

    //Get number of Unique places without filters
    gather.writeData(uniquePlacesCounter, uniquePlacesFirstNumber);

    //Filter by place
    action.clickElement("#where");
    action.clickElementWithText(".result-links__list", "Poland");

    cy.wait(1000);

    //Check the number and get new one saved, compare two to have different value
    gather.writeData(uniquePlacesCounter, uniquePlacesSecondNumber);
    gather.compareTwoDatas(uniquePlacesFirstNumber, uniquePlacesSecondNumber);

    //Filter by Date
    // action.clickElementWithText(".search-bar-text", "When are you going?");

    // cy.wait(1000);
    //Select first and second future dates
    // datepicker.selectDatepickerWithRangeFromToday(1, 2);

    // cy.wait(1000);
    //Clicks save
    // action.clickElementWithText(
    //   ".btn btn--orange advanced-options__add",
    //   "Save"
    // );

    //Check the number and get new one, compare two to have different value
    //Click on number of guests
    //Add two adults
    //Add one pet
    //Select medium dog
    //Check the number and get new one, compare two to have different value
    //Click on Filters
    //In which location select in the mountains
    //Click what about food and select we cook for you
    //Click Save
    //Check tags and Check the number and get new one, compare two to have different value
    //Click on Filters
    //Click Clear All
    //Click Save
    //Check tags missing and number
  });

  it("Book any place without filtering it", () => {
    //Click explore and book on main page
    action.clickButton(page_data.exploreButtonName);
    verify.checkTextAndUrl(
      ".catalog-page",
      page_data.catalogTitle,
      page_paths.catalog.dashboard
    );
    //Move into fourth page of pagination and chose first place
    //Click on number of guests
    //Add two adults
    //Add one children
    //Change age of children on 10 years old
    //Click Select Dates
    //Select arrival
    //Select departure
    //Click Accommodation options
    //Check guests, nights
    //Get price
    //Click Summary
    //Check name of the hotel, dates and guests
    /**
     * There is no possibility to do more tests without payment process!
     */
  });
});
