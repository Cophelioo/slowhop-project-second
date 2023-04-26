/// <reference types="cypress" />

import page_data from "../../fixtures/page_data.json";
import page_paths from "../../fixtures/page_paths.json";

function redirectInto(path) {
  cy.visit(Cypress.env("slowhopPortal") + path);
  cy.url().should("be.equals", Cypress.env("slowhopPortal") + path);
}

export class NavigationPage {
  validateUrl(path) {
    cy.url().should("be.equals", Cypress.env("slowhopPortal") + path);
  }

  mainPage() {
    cy.visit(Cypress.env("slowhopPortal"));
    cy.url().should("be.equals", Cypress.env("slowhopPortal"));
    cy.title().should("include", page_data.mainTitle);
  }

  logout() {
    cy.visit("https://slowhop.com/logout");
    cy.url().should("be.equals", Cypress.env("slowhopPortal") + "/");
    cy.title().should("include", page_data.company);
  }

  profilePage() {
    redirectInto(page_paths.profile.travels.my_booking_requests);
    this.validateUrl(page_paths.profile.travels.my_booking_requests);
  }

  futureTripsPage() {
    redirectInto(page_paths.profile.travels.future_trips);
    this.validateUrl(page_paths.profile.travels.future_trips);
  }

  changePasswordPage() {
    redirectInto(page_paths.settings.password);
    this.validateUrl(page_paths.settings.password);
  }

  contactDataPage() {
    redirectInto(page_paths.settings.contact);
    this.validateUrl(page_paths.settings.contact);
  }

  favoritePage() {
    redirectInto(page_paths.profile.favorite);
    this.validateUrl(page_paths.profile.favorite);
  }

  aboutMePage() {
    redirectInto(page_paths.profile.profile_about_me);
    this.validateUrl(page_paths.profile.profile_about_me);
  }
}

export const navigateTo = new NavigationPage();
