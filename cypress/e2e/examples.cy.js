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

  it.only("we can type into the input and add a grudge", () => {
    const grudgeText = "a grudge";
    cy.wait(500);
    cy.getDataTest("grudge-list-container").as("grudgeContainer");

    // check title of grudge container when there are no grudges
    cy.get("@grudgeContainer")
      .find("h3")
      .contains(/add some grudges/i)
      .should("exist");
    cy.get("@grudgeContainer").find("h3").should("not.have.text", "Grudges");

    // list is empty when there are no grudges
    cy.getDataTest("grudge-list").within(() => {
      cy.get("li").should("have.length", 0);
    });

    // enter a grudge
    cy.get("@grudgeContainer").find("input").type(grudgeText);
    cy.get("@grudgeContainer").find("button").click();
    cy.getDataTest("grudge-list").within(() => {
      cy.get("li").should("have.length", 1);
    });
    cy.get("@grudgeContainer")
      .find("h3")
      .contains(/add some grudges/i)
      .should("not.exist");
    cy.get("@grudgeContainer").find("h3").should("have.text", "Grudges");

    // delete a grudge
    cy.get("@grudgeContainer").find("li").find("button").click();
    cy.get("@grudgeContainer").find("li").should("not.exist");
  });
});
