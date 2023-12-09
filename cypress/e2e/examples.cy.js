describe("examples test", () => {
  beforeEach(() => {
    cy.visit("/examples");
  });
  it("multi-page testing", () => {
    // why cypress
    cy.getDataTest("nav-why-cypress").click();
    cy.location("pathname").should("equal", "/");
    // overview
    cy.getDataTest("nav-overview").click();
    cy.location("pathname").should("equal", "/overview");
    // fundamentals
    cy.getDataTest("nav-fundamentals").click();
    cy.location("pathname").should("equal", "/fundamentals");
    // forms
    cy.getDataTest("nav-forms").click();
    cy.location("pathname").should("equal", "/forms");
    // examples
    cy.getDataTest("nav-examples").click();
    cy.location("pathname").should("equal", "/examples");
    // component
    cy.getDataTest("nav-component").click();
    cy.location("pathname").should("equal", "/component");
    // best practice
    cy.getDataTest("nav-best-practices").click();
    cy.location("pathname").should("equal", "/best-practices");
  });

  it("intercepts", () => {
    cy.intercept("POST", "http://localhost:3000/examples", {
      fixture: "example.json",
    });
    cy.getDataTest("nav-examples").click();
    cy.getDataTest("post-data-button").click();
  });

  it.only("grudge list test", () => {
    const grudgeOne = "a grudge";
    const grudgeTwo = "second one";

    cy.wait(500);
    cy.getDataTest("grudge-list-container").as("grudgeContainer");
    cy.getDataTest("add-grudge").as("addGrudgeButton");
    cy.getDataTest("clear-grudges").should("not.exist");
    cy.getDataTest("grudge-list-title").as("grudgeListTitle");

    // check title of grudge container when there are no grudges
    cy.contains(/add some grudges/i).should("exist");
    cy.get("@grudgeListTitle").should("not.have.text", "Grudges");

    // list is empty when there are no grudges
    cy.getDataTest("grudge-list").within(() => {
      cy.get("li").should("have.length", 0);
    });

    // enter a grudge
    cy.get("@grudgeContainer").find("input").type(grudgeOne);
    cy.get("@addGrudgeButton").click();
    cy.getDataTest("grudge-list").within(() => {
      cy.get("li").should("have.length", 1);
    });
    cy.contains(/add some grudges/i).should("not.exist");
    cy.get("@grudgeListTitle").should("have.text", "Grudges");

    // enter another grudge
    cy.get("@grudgeContainer").find("input").type(grudgeTwo);
    cy.get("@addGrudgeButton").click();
    cy.getDataTest("grudge-list").within(() => {
      cy.get("li").should("have.length", 2);
      cy.get("li").its(1).should("contains.text", "second one");
    });

    // delete a grudge
    cy.get("@grudgeContainer").find("li").its(0).find("button").click();
    cy.getDataTest("grudge-list").within(() => {
      cy.get("li").should("have.length", 1);
    });

    // clear all grudges
    cy.getDataTest("clear-grudges").click();
    cy.getDataTest("grudge-list").within(() => {
      cy.get("li").should("have.length", 0);
    });
  });
});
