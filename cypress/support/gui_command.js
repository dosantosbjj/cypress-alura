Cypress.Commands.add('login', (nome, senha) => {
    cy.get('input[formcontrolname="userName"]').type(Cypress.env('userName'));
    cy.get('input[formcontrolname="password"]').type(Cypress.env('password'), {log: false});
    cy.get('button[type="submit"]').click();
})

Cypress.Commands.add('cadastro', (email, nomeCompleto, user, senha) => {
    cy.contains('a','Register now').click()
    cy.contains('button','Register').click()
    cy.get('input[formcontrolname="email"]').type(email);
    cy.get('input[formcontrolname="fullName"]').type(nomeCompleto);
    cy.get('input[formcontrolname="userName"]').type(user);
    cy.get('input[formcontrolname="password"]').type(senha, {log : false});
    cy.contains('button','Register').click()    
}) 