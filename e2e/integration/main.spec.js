// enables intelligent code completion for Cypress commands
// https://on.cypress.io/intelligent-code-completion
/// <reference types="Cypress" />

describe("Home", () => {
  it("has navbar with 5 links", () => {
    cy.visit("/");
    cy.contains("a", "Home");
    cy.get("nav").children().should("have.length", 1);
    cy.get("ul").children().should("have.length", 5);
  });

  it("goes to the second link", () => {
    cy.visit("/");
    cy.get("ul>li").eq(2).find("a").click();
    cy.url().should("match", /newPage$/);
  });

  it("goes through all the links", () => {
    cy.visit("/");
    cy.get("ul>li").eq(1).find("a").click();
    cy.url().should("match", /newPage$/);
    cy.get("ul>li").eq(2).find("a").click();
    cy.url().should("match", /newPage$/);
    cy.get("ul>li").eq(3).find("a").click();
    cy.url().should("match", /newPage$/);
    cy.get("ul>li").eq(4).find("a").click();
    cy.url().should("match", /newPage$/);
    cy.get("ul>li").eq(0).find("a").click();
    cy.url().should("match", /\//);
  });
});
