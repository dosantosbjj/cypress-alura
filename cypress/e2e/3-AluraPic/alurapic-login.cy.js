
describe('Login e registro de usuarios', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.intercept('POST', 'https://apialurapic.herokuapp.com/user/login', {
            statusCode: 400
        }).as('stubPost')
    })
    
    it('login de usuario valido', () => {
        cy.login(Cypress.env('userName'), Cypress.env('password'))
        cy.wait('@stubPost')
        cy.contains('a', '(Logout)').should('be.visible')
    })

    it('login de usuario invalido', () => {
        cy.login('lucas', '1234')
        cy.on('window:alert', (str) => {
            expect(str).to.equal('Invalid user name or password')
        })
    })
})