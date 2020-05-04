describe("Testing Form", function() {
    beforeEach(function(){
        cy.visit("http://localhost:3000");
    })

    it("Adds text to fields" ,function(){
        cy.get('[data-cy="name"]')
        .type("Mark Stahl")
        .should("have.value","Mark Stahl");
        cy.get('[data-cy="address"]')
        .type("123 Fake Street")
        .should("have.value", "123 Fake Street")
        cy.get('#size')
        .select('Large')
        .should("have.value","large");
        cy.get('[data-cy="peppers"]')
        .check()
        .should("be.checked");
        cy.get('[data-cy="onions"]')
        .check()
        .should("be.checked")
        cy.get('[data-cy="specialrequest"]')
        .type("Well done please")
        .should("have.value", "Well done please");
        cy.contains("Place Order")
        .click();
    });
});