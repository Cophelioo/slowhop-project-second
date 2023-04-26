/// <reference types="cypress" />

import { NavigationPage } from "../../support/page_objects/navigation.js";
import { Verify } from "../../support/page_objects/verify.js";
import { Actions } from "../../support/page_objects/actions.js";
import { faker } from "@faker-js/faker";

import page_data from "../../fixtures/page_data.json";
import page_paths from "../../fixtures/page_paths.json";

const navigation = new NavigationPage();
const verify = new Verify();
const action = new Actions();

const myTravelsData = [
  page_data.profile.myTravelsEmptyMessages.reason,
  page_data.profile.myTravelsEmptyMessages.message,
  page_data.profile.myTravelsEmptyMessages.button,
];

const favoritesData = [
  page_data.profile.favoritesEmptyMessages.reason,
  page_data.profile.favoritesEmptyMessages.message,
  page_data.profile.favoritesEmptyMessages.button,
];

const profileContentBox = ".profile--content";
const profileData = [
  page_data.profile.profileTextBox,
  page_data.profile.profileAboutMe,
];

const profilePictureData = [
  page_data.profile.profilePictureTab,
  page_data.profile.profilePictureDescription,
  page_data.profile.profilePictureButton,
];

const settingsContactData = [
  page_data.profile.contactDataFormular.name,
  page_data.profile.contactDataFormular.lastname,
  page_data.profile.contactDataFormular.email,
  page_data.profile.contactDataFormular.phoneNumber,
  page_data.profile.contactDataFormular.language,
];
const settingsContactDataCheckbox = page_data.profile.contactDataCheckbox;

const changePasswordFormularData = [
  page_data.profile.changePasswordFormular.oldPassword,
  page_data.profile.changePasswordFormular.newPassword,
  page_data.profile.changePasswordFormular.repeatPassword,
];

const saveNoticeClass = ".save-notice";
const savedChangesNotice = "Changes have been saved";

const favoriteButton = ".favourite-button";
const favoriteIcon = ".favorite-icon";
const resultsContainer = "#results-container";
const aboutMeContainer = "#about-me";
const form = "form";

describe("Tests that are checking all profile pages", () => {
  beforeEach(() => {
    cy.loginToSlowhop();
  });

  it("Navigate through all tabs in profile and verify empty contect in them", () => {
    //Navigate into profilePage and validate it url
    navigation.profilePage();
    //Check if one prepared content is inside My booking request
    verify.chceckTextOnPage(
      profileContentBox,
      page_data.profile.myBookingRequestsPlace
    );

    //Check all subtabs inside My Travels and check content that is appearing on pages
    cy.get(page_data.profile.myTravelsTabs).each((element, index) => {
      action.clickButton(page_data.profile.myTravelsTabs[index]);
      verify.checkTextsOnPage(profileContentBox, myTravelsData);
    });

    //Navigate into favourite tabs
    action.clickButton(page_data.profile.favoritesTab);
    verify.checkTextsOnPage(resultsContainer, favoritesData);

    //Navigate into profile tab
    action.clickButton(page_data.profile.profileTab);
    verify.checkTextsOnPage(profileContentBox, profileData);

    //Navigate into profile picture tab
    action.clickButton(page_data.profile.profilePictureTab);
    verify.checkTextsOnPage(profileContentBox, profilePictureData);

    //Navigate into settings tab
    action.clickButton(page_data.profile.settingsTab);
    verify.checkTextsOnPage(profileContentBox, settingsContactData);

    //Navigate into change password tab
    action.clickButton(page_data.profile.passwordTab);
    verify.checkTextsOnPage(profileContentBox, changePasswordFormularData);
  });

  it("Work with My travels and favorites tab inside profile", () => {
    const firstObjectHref = page_paths.first_gathered_data_file;
    const firstObjectName = page_paths.second_gathered_data_file;

    //Navigate into My travles future trips profile page and click "Find a trip"
    navigation.futureTripsPage();
    action.clickButton(page_data.profile.myTravelsEmptyMessages.button);
    verify.checkTextAndUrl(
      ".catalog-page",
      page_data.catalogTitle,
      page_paths.catalog.dashboard
    );

    //Find first trip on third pagination page
    action.clickPagination(3);
    navigation.validateUrl(page_paths.catalog.dashboard + "?page=3");

    cy.wait(2000);

    //Save into json href of the place that was found
    cy.get(".catalog-tile__link", { timeout: 5000 })
      .first()
      .then((hrefOfThePlace) => {
        let href = hrefOfThePlace.attr("href").substring(3);
        cy.writeFile(firstObjectHref, { href: href });
      });

    //Save into json name of the place that was found
    cy.get(".catalog-tile__name")
      .first()
      .then((nameOfThePlace) => {
        let name = nameOfThePlace.text();
        cy.writeFile(firstObjectName, { name: name });
      });

    //Click on the first trip on the third page of pagination to move into its details
    cy.get(".catalog-tile").first().click();

    //Verify name and href of the place
    cy.readFile(firstObjectHref).then((value) => {
      navigation.validateUrl(value.href);
    });
    cy.readFile(firstObjectName).then((value) => {
      cy.get(".contenteditable").first().contains(value.name);
    });

    //Add to favorites
    action.clickElement(favoriteButton);

    //Move into favorites tab and check if added place is inside container
    navigation.favoritePage();
    cy.readFile(firstObjectName).then((value) => {
      cy.get(resultsContainer)
        .first()
        .then((place) => {
          expect(place).contain(value.name);
        });
    });

    //Click on the place and unlike it there
    action.clickFirstElement(favoriteIcon);

    //Reload page and verify if the favorites tab in profile is empty now
    cy.reload();
    verify.checkTextsOnPage(resultsContainer, favoritesData);
  });

  it("Work with Profile tab by adding some description and reloading a page", () => {
    const shortDescription = faker.random.alphaNumeric(250);

    //Navigate into profile tab
    navigation.aboutMePage();
    verify.checkTextsOnPage(profileContentBox, profileData);

    //Add description and save it
    action.fillOneSelect(aboutMeContainer, shortDescription);
    action.clickElement('[type="submit"]');
    verify.checkHideElementAppears(saveNoticeClass, savedChangesNotice);

    //Reload page
    cy.reload();

    //Check if the description is still added
    verify.chceckTextOnPage(aboutMeContainer, shortDescription);

    //Clear text box and save after that check if description is not there anymore
    action.clearChosenSelect(aboutMeContainer);
    action.clickElement('[type="submit"]');
    verify.checkHideElementAppears(saveNoticeClass, savedChangesNotice);

    //Reload page
    cy.reload();

    //Check if the text box is empty
    verify.checkExpectInputIsEmpty(aboutMeContainer);
  });

  it("Work with contact data tab", () => {
    const generatedName = faker.name.firstName();
    const generatedLastName = faker.name.lastName();
    const generatedNumber = faker.phone.number("+48 ### ### ###");

    const languageId = "#language";
    const checkbox = '[type="checkbox"]';
    const name = "#name";

    const contactDataElements = [name, "#surname", "#phone"];

    let contactData = [generatedName, generatedLastName, generatedNumber];

    //Navigate into Settings tab and fill contact data
    navigation.contactDataPage();

    //Change name, lastname, number and language
    action.fillForm(contactDataElements, contactData);
    action.selectOption(languageId, "English", "en");

    //Click checkbox and verify if its checked
    action.checkCheckbox(checkbox);

    //Unclick checkbox and verify if its unchecked
    action.uncheckCheckbox(checkbox);

    //Save changes
    action.clickSubmit();
    verify.checkHideElementAppears(saveNoticeClass, savedChangesNotice);

    //Reload page
    cy.reload();

    //Pushing new element and text to be chcecked soon
    contactData.push("en");
    contactDataElements.push(languageId);

    //Changing generated name into uppercase for checking value
    let upperCaseName = generatedName.toUpperCase();

    //Check if the changes are saved
    verify.checkFormValues(contactDataElements, contactData);
    verify.checkAccountName(upperCaseName);

    //Change language and name to orginal one, reload page and check accout name
    action.clearChosenSelect(name);
    verify.checkExpectInputIsEmpty(name);
    action.selectOption(languageId, "Polski", "pl");
    action.clickSubmit();
    verify.checkHideElementAppears(saveNoticeClass, savedChangesNotice);
    cy.reload();
    verify.checkAccountName("YOUR ACCOUNT");
  });

  it("Work with password changing, logout and login again with new password and change the passwords again", () => {
    const generatedNewPassword = faker.random.alphaNumeric(10);

    const passwordFormularElements = [
      "#old-pass",
      "#new-pass",
      "#confirm-pass",
    ];

    const passwordFormularData = [
      Cypress.env("slowhopPassword"),
      generatedNewPassword,
      generatedNewPassword,
    ];

    const oldPasswordFormularData = [
      generatedNewPassword,
      Cypress.env("slowhopPassword"),
      Cypress.env("slowhopPassword"),
    ];

    //Navigate into password change tab
    navigation.changePasswordPage();

    //Fill the formular and save new generate password
    action.fillForm(passwordFormularElements, passwordFormularData);

    //Click save button and check notice
    action.clickSubmit();
    verify.checkHideElementAppears(saveNoticeClass, savedChangesNotice);

    //Logout
    navigation.logout();

    //Login with new password
    cy.get(".login-link").click();
    cy.wait(500);
    cy.get(".login-link", { timeout: 10000 }).should("not.be.visible");
    cy.get(".modal-body")
      .should("contain", "Log in")
      .then((loginModal) => {
        cy.wrap(loginModal)
          .find(".login-email")
          .type(Cypress.env("slowhopLogin"));
        cy.wrap(loginModal).find(".login-pass").type(generatedNewPassword);
        cy.wrap(loginModal).find(".login-submit").click();
      });
    cy.get(".container-fluid").should("contain", "YOUR ACCOUNT");

    //Navigate into changing password tab and change passwords for the old one
    navigation.changePasswordPage();
    action.fillForm(passwordFormularElements, oldPasswordFormularData);

    //Save changes
    action.clickSubmit();
    verify.checkHideElementAppears(saveNoticeClass, savedChangesNotice);
  });
});
