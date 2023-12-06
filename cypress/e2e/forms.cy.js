describe("form tests", () => {
  it("test subscribe form", () => {
    cy.visit("/forms");
    cy.contains(/testing forms/i);
    cy.get('[data-test="form-input"]').find("input").type("name@email.com");
    // cy.getDataTest("subscribe-button").click();
  });
});
