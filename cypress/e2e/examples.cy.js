describe("examples test", () => {
  beforeEach(() => {
    cy.visit("/examples");
  });
  it("multi-page testing", () => {
    cy.wait(500);
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

  it.only("intercepts", () => {
    cy.intercept("POST", "http://localhost:3000/examples", {
      body: { message: "successfully intercepted request" },
    });
    cy.getDataTest("nav-examples").click();
    cy.getDataTest("post-data-button").click();
  });
});
