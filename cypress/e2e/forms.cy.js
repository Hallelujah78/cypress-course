describe("form tests", () => {
  beforeEach(() => {
    cy.visit("/forms");
    cy.contains(/testing forms/i).should("exist");
    cy.get('[data-test="form-input"]').find("input").as("subscribe-input");
  });
  it("test subscribe form", () => {
    cy.wait(500);
    // happy path

    cy.contains(/successfully subbed: gavan@email.com!/i).should("not.exist");
    cy.get("@subscribe-input").type("gavan@email.com", { delay: 15 });
    cy.getDataTest("subscribe-button").click();
    cy.contains(/successfully subbed: gavan@email.com!/i).should("exist");
    cy.wait(3000);
    cy.contains(/successfully subbed: gavan@email.com!/i).should("not.exist");

    //unhappy path 1 - invalid email
    cy.contains(/invalid email: gavan@email.io!/i).should("not.exist");
    cy.get("@subscribe-input").type("gavan@email.io", { delay: 15 });
    cy.getDataTest("subscribe-button").click();
    cy.contains(/invalid email: gavan@email.io!/i).should("exist");
    cy.wait(3000);
    cy.contains(/invalid email: gavan@email.io!/i).should("not.exist");

    // unhappy path 2 - nothing typed into input
    cy.contains(/fail!/i).should("not.exist");
    cy.getDataTest("subscribe-button").click();
    cy.contains(/fail!/i).should("exist");
    cy.contains(/fail!/i).should("not.exist");
  });
});
