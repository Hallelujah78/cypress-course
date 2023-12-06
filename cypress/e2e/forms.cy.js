describe("form tests", () => {
  it("test subscribe form", () => {
    cy.visit("/forms");
    cy.wait(500);
    cy.contains(/testing forms/i);
    cy.get('[data-test="form-input"]')
      .find("input")
      .click()
      .type("gavan@email.com", { delay: 15 });

    cy.getDataTest("subscribe-button").should("have.length", 1).eq(0).click();
    cy.contains(/successfully subbed: gavan@email.com!/i);
  });
});
