
describe('Registro de usuário', () => {
    beforeEach(() => {
        cy.visit('/');
    })    

    it('verifica username disponivel', () => {
        cy.contains('Register now').click()
        cy.contains('button', 'Register').click()
        cy.get('input[formcontrolname="userName"]').type('lssantos07')
        cy.get('.text-success').should('be.visible')
    })

    it('verifica username em uso', () => {
        cy.contains('Register now').click()
        cy.contains('button', 'Register').click()
        cy.get('input[formcontrolname="userName"]').type('flavio')
        cy.contains('.text-danger', 'Username already taken').should('be.visible')
    })

    it('verifica tamanho minimo do nome', () => {
        cy.contains('Register now').click()
        cy.contains('button', 'Register').click()
        cy.get('input[formcontrolname="fullName"]').type('j')
        cy.contains('button', 'Register').click()
        cy.contains('ap-vmessage', 'Mininum length is 2').should('be.visible')
    })    

    it('verifica letra minuscula', () => {
        cy.contains('Register now').click()
        cy.contains('button', 'Register').click()
        cy.get('input[formcontrolname="userName"]').type('johnny')
        cy.contains('button', 'Register').click()
        cy.contains('.text-success', 'User available')
    })   

    const usuarios = require('../../fixtures/usuarios.json')
    usuarios.forEach(usuario => {
        it(`cadastrando usuário ${usuario.userName}`, () => {
            cy.cadastro(usuario.email,
                        usuario.fullName,
                        usuario.userName,
                        usuario.password)
        })
    });    
})