import { default as ItemsAccordion } from "@/app/components/Accordion";
// expects items {id, summary, details}

const items = [
  {
    summary: "Reason 1",
    details:
      "An all-in-one testing framework, assertion library, with mocking and stubbing",
    id: "1",
  },
  {
    summary: "Reason 2",
    details: "Focus on E2E and Component Testing -- real world testing",
    id: "2",
  },
  {
    summary: "Reason 3",
    details: "Runs in the browser and wrote in JavaScript",
    id: "3",
  },
];

describe("Accordion.cy.jsx", () => {
  it("items accordion", () => {
    cy.mount(<ItemsAccordion items={items} />);
    cy.getDataTest("accordion-wrapper").within(() => {
      cy.get('[data-test^="accordion-item"]').should("have.length", 3);
    });

    //
    cy.contains("An all-in-one testing framework,").should("not.be.visible");

    cy.getDataTest("accordion-item-1").within(() => {
      cy.get('[role="button"]').click();
    });

    cy.contains("An all-in-one testing framework,").should("be.visible");
    cy.getDataTest("accordion-item-1").within(() => {
      cy.get('[role="button"]').click();
    });
    cy.contains("An all-in-one testing framework,").should("not.be.visible");
  });
});
