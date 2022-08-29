
describe('Mensagens de validacao', () => {
    beforeEach(() => {
        cy.visit('/');
    })

    it('verifica mensagens validacao', () => {
        cy.contains('Register now').click()
        cy.contains('button', 'Register').click()
        cy.contains('ap-vmessage', 'Email is required!').should('be.visible')
        cy.contains('button', 'Register').click()
        cy.contains('ap-vmessage', 'User name is required!')
            .should('be.visible')
        cy.contains('ap-vmessage', 'Full name is required!')
            .should('be.visible')
        cy.contains('ap-vmessage', 'Password is required!')
            .should('be.visible')
    })

    it('verifica mensagem de email invalido', () => {
        cy.contains('Register now').click()
        cy.contains('button', 'Register').click()
        cy.get('input[formcontrolname="email"]').type('Lucas')
        cy.contains('ap-vmessage', 'Invalid e-mail').should('be.visible')
    })

    it('verifica erro de tamanho minimo da senha', () => {
        cy.contains('Register now').click()
        cy.contains('button', 'Register').click()
        cy.get('input[formcontrolname="password"]').type('123')
        cy.contains('button', 'Register').click()
        cy.contains('ap-vmessage', 'Mininum length is 8').should('be.visible')
    })

    it('verifica erro letra maiuscula', () => {
        cy.contains('Register now').click()
        cy.contains('button', 'Register').click()
        cy.get('input[formcontrolname="userName"]').type('Flavio')
        cy.contains('button', 'Register').click()
        cy.contains('.text-danger', 'Must be lower case')
    })
})