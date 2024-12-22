/// <reference types='cypress'/>

describe("TAT Customer Service Center", () => {
  beforeEach("fills in the required fields and submits the form", () => {
    cy.visit("./src/index.html");
  });

  it("checks the application title", () => {
    cy.visit("./src/index.html");
    cy.title().should("be.equal", "TAT Customer Service Center");
  });

  it("fills in the required fields and submits the form", () => {
    cy.get("#firstName").type("anand");
    cy.get("#lastName").type("tajne");
    cy.get("#email").type("anand.tajne@gmail.com ", { log: false });
    const longtext = Cypress._.repeat("feedback test", 10);
    cy.get("#open-text-area").type(longtext, { delay: 0 }).click();
    cy.contains("button", "Send").click();
    cy.get(".success").children("strong").should("be.visible");
  });

  it("displays an error message when submitting the form with an email with invalid formatting", () => {
    cy.get("#firstName").type("anand");
    cy.get("#lastName").type("tajne");
    cy.get("#email").type("sdfhj@uef@uhshfkjf@.com");
    cy.get("#open-text-area")
      .type(
        `Sure! Could you clarify what kind of feedback you're looking for? It could be related to a specific topic, project, or something else.`,
        { delay: 0 }
      )
      .click();
    cy.contains("button", "Send").click();
    cy.get(".error")
      .children("strong")
      .should("have.text", "Validate the required fields!");
  });

  it("test to validate that if a non-numeric value is entered", () => {
    cy.get("#phone").type("ABCDEFGIJK").should("have.value", "");
    cy.contains("button", "Send").click();
    cy.get(".error")
      .children("strong")
      .should("have.text", "Validate the required fields!");
  });

  it("displays an error message when the phone becomes required but is not filled in before the form submission", () => {
    cy.get("#firstName").type("anand");
    cy.get("#lastName").type("tajne");
    cy.get("#email").type("anand.tajne@gmail.com ");
    // cy.get('#phone').type('').should('have.value', '')
    cy.get("#phone-checkbox").check().should("be.checked");
    cy.get("#open-text-area")
      .type(
        `Sure! Could you clarify what kind of feedback you're looking for? It could be related to a specific topic, project, or something else.`,
        { delay: 0 }
      )
      .click();
    cy.contains("button", "Send").click();
    cy.get(".error")
      .children("strong")
      .should("have.text", "Validate the required fields!");
  });

  it("fills and clears the first name, last name, email, and phone fields", () => {
    cy.get("#firstName")
      .type("anand")
      .should("have.value", "anand")
      .clear()
      .should("have.value", "");
    cy.get("#lastName")
      .type("tajne")
      .should("have.value", "tajne")
      .clear()
      .should("have.value", "");
    cy.get("#email")
      .type("anand.tajne@gmail.com")
      .should("have.value", "anand.tajne@gmail.com")
      .clear()
      .should("have.value", "");
    cy.get("#phone")
      .type("4578654785")
      .should("have.value", "4578654785")
      .clear()
      .should("have.value", "");
  });

  it("displays an error message when submitting the form without filling the required fields", () => {
    cy.contains("button", "Send").click();
    cy.get(".error")
      .children("strong")
      .should("have.text", "Validate the required fields!");
  });

  it("successfully submits the form using a custom command", () => {
    const data = {
      firstName: "John",
      lastName: "Doe",
      email: "John.Doe@gmail.com",
      feedback: `Sure! Could you clarify what kind of feedback you're looking for? It could be related to a specific topic, project, or something else.`,
    };
    cy.fillMandatoryFieldsAndSubmit(data);

    cy.get(".success").children("strong").should("be.visible");
  });

  it("selects a product (YouTube) by its content", () => {
    cy.get("#product").select("YouTube").should("have.value", "youtube"); // select value by option value
  });

  it("selects a product (Mentorship) by its value", () => {
    cy.get("#product").select("mentorship").should("have.value", "mentorship"); // select value by option value
  });

  it("selects a product (Blog) by its index", () => {
    cy.get("#product").select(1).should("have.value", "blog"); // select value by option value
  });

  it('checks the type of service "Feedback"', () => {
    cy.get('input[type="radio"][value="feedback"]')
      .check()
      .should("be.checked")
      .and("have.value", "feedback");
  });

  it("checks each type of service", () => {
    cy.get("#support-type")
      .find('input[type="radio"]')
      .each((typeOfService) => {
        cy.wrap(typeOfService).check().should("be.checked");
      });
  });

  it("checks both checkboxes, then unchecks the last one", () => {
    // my solution
    // cy.get('#check')
    // .find('input[type="checkbox"]')
    // .each(checkBox=>{
    //   cy.wrap(checkBox)
    //   .check()
    //   .should('be.checked')
    // })
    // .last('input[type="checkbox"]').uncheck().should('not.be.checked')

    // course solution
    cy.get('input[type="checkbox"]')
      .check()
      .should("be.checked")
      .last()
      .uncheck()
      .should("not.be.checked");
  });

  it("displays an error message when the phone becomes required but is not filled in before the form submission", () => {
    cy.get("#firstName").type("anand");
    cy.get("#lastName").type("tajne");
    cy.get("#email").type("anand.tajne@gmail.com ", { log: false });
    cy.get("#phone-checkbox").check().should("be.checked");
    const longtext = Cypress._.repeat("feedback test", 10);
    cy.get("#open-text-area").type(longtext, { delay: 0 }).click();
    cy.contains("button", "Send").click();
    cy.get(".error")
      .children("strong")
      .should("be.visible")
      .and("have.text", "Validate the required fields!");
  });

  it("selects a file from the fixtures folder", () => {
    cy.get('input[type="file"]')
      .selectFile("cypress/fixtures/example.json")
      .should((input) => {
        expect(input[0].files[0].name).to.be.equal("example.json");
      });
  });

  it("selects a file simulating a drag-and-drop", () => {
    cy.get('input[type="file"]')
      .selectFile("cypress/fixtures/example.json", { action: "drag-drop" })
      .should((input) => {
        expect(input[0].files[0].name).to.be.equal("example.json");
      });
  });

  it("selects a file using a fixture to which an alias was given", () => {
    cy.fixture('example.json').as('sampleFile')
    cy.get('input[type="file"]')
      .selectFile("@sampleFile", { action: "drag-drop" })
      .should((input) => {
        expect(input[0].files[0].name).to.be.equal("example.json");
      });
  });

  it('verifies that the privacy policy page opens in another tab without the need for a click',()=>{
    cy.contains('a','Privacy Policy')
    .should('have.attr','href','privacy.html')
    .and('have.attr','target','_blank')    
  })

  it('access the privacy policy page by removing the target, then clicking on the link',()=>{
   cy.contains('a','Privacy Policy')
   .invoke('removeAttr','target')
   .click()
   
  cy.contains('h1','TAT CSC - Privacy Policy').should('be.visible')
  })
});