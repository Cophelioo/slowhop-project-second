/// <reference types="cypress" />

import user_data from "../../fixtures/user_data.json";
import user_id from "../../fixtures/user_id.json";
import { faker } from "@faker-js/faker";

const userIdPath = "cypress/fixtures/user_id.json";
const userData = {
  name: faker.name.firstName() + " " + faker.name.lastName(),
  gender: "male",
  email: faker.random.alphaNumeric(10) + "@gmail.com",
  status: "active",
};

describe("Tests that are checking API knowledge of testing", () => {
  before(() => {});

  it("Create a new user", () => {
    cy.request({
      method: "POST",
      url: "https://gorest.co.in/public/v2/users",
      headers: {
        Authorization: "Bearer " + Cypress.env("accessToken"),
      },
      body: userData,
    })
      .then((response) => {
        cy.writeFile(userIdPath, response.body);
        expect(response.status).to.equal(201);
      })
      .then(() => {
        cy.request({
          method: "POST",
          url: "https://gorest.co.in/public/v2/users",
          headers: {
            Authorization: "Bearer " + Cypress.env("accessToken"),
          },
          body: {
            name: user_id.name,
            gender: "male",
            email: user_id.email,
            status: "active",
          },
          failOnStatusCode: false,
        });
      })
      .then((secondResponse) => {
        expect(secondResponse.status).to.equal(422);
        expect(secondResponse.body[0].field).to.equal("email");
        expect(secondResponse.body[0].message).to.equal(
          "has already been taken"
        );
        console.log(secondResponse.body);
      });
  });

  it("Get created user", () => {
    let userId = user_id.id;

    cy.request({
      method: "GET",
      url: `https://gorest.co.in/public/v2/users/${userId}`,
      headers: {
        Authorization: "Bearer " + Cypress.env("accessToken"),
      },
    }).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.body.name).to.equal(user_id.name);
      expect(response.body.gender).to.equal(user_id.gender);
      expect(response.body.email).to.equal(user_id.email);
      expect(response.body.status).to.equal(user_id.status);
    });
  });

  it("Edit newly added user", () => {
    let userId = user_id.id;
    let patchedName = faker.name.firstName() + " " + faker.name.lastName();

    cy.request({
      method: "PATCH",
      url: `https://gorest.co.in/public/v2/users/${userId}`,
      headers: {
        Authorization: "Bearer " + Cypress.env("accessToken"),
      },
      body: {
        name: patchedName,
      },
    }).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.body.name).to.equal(patchedName);
    });
  });

  it("Delete newly created user", () => {
    let userId = user_id.id;

    cy.request({
      method: "DELETE",
      url: `https://gorest.co.in/public/v2/users/${userId}`,
      headers: {
        Authorization: "Bearer " + Cypress.env("accessToken"),
      },
    })
      .then((response) => {
        expect(response.status).to.equal(204);
      })
      .then(() => {
        cy.request({
          method: "GET",
          url: `https://gorest.co.in/public/v2/users/${userId}`,
          headers: {
            Authorization: "Bearer " + Cypress.env("accessToken"),
          },
          failOnStatusCode: false,
        }).then((secondResponse) => {
          expect(secondResponse.status).to.equal(404);
          expect(secondResponse.body.message).to.equal("Resource not found");
        });
      });
  });
});
