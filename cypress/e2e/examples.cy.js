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
    // .invoke(), .within(), .its(), .request()
    cy.get("@grudgeContainer").find("input").type(grudgeText);

    cy.get("@grudgeContainer").find("button").click();
    cy.get("@grudgeContainer")
      .find("ul")
      .find("li")
      .find("span")
      .contains(grudgeText)
      .should("exist");
  });
});
