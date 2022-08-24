describe('Login e registro de usuarios', () => {
    beforeEach(() => {
        cy.visit('https://alura-fotos.herokuapp.com/');
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

    // it('verifica email valido', () => {
    //     cy.contains('Register now').click()
    //     cy.contains('button','Register').click()
    //     cy.get('input[formcontrolname="email"]').type('teste@teste.com')
    //     cy.contains('ap-vmessage','Invalid e-mail').not().should('be.visible')
    // })

    it('verifica erro de tamanho minimo da senha', () => {
        cy.contains('Register now').click()
        cy.contains('button', 'Register').click()
        cy.get('input[formcontrolname="password"]').type('123')
        cy.contains('button', 'Register').click()
        cy.contains('ap-vmessage', 'Mininum length is 8').should('be.visible')
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


    it('verifica erro letra maiuscula', () => {
        cy.contains('Register now').click()
        cy.contains('button', 'Register').click()
        cy.get('input[formcontrolname="userName"]').type('Flavio')
        cy.contains('button', 'Register').click()
        cy.contains('.text-danger', 'Must be lower case')
    })

    it('verifica letra minuscula', () => {
        cy.contains('Register now').click()
        cy.contains('button', 'Register').click()
        cy.get('input[formcontrolname="userName"]').type('johnny')
        cy.contains('button', 'Register').click()
        cy.contains('.text-success', 'User available')
    })

    it('login de usuario valido', () => {
        cy.login('flavio', '123')
        cy.contains('a', '(Logout)').should('be.visible')
    })

    it('login de usuario invalido', () => {
        cy.login('lucas', '1234')
        cy.on('window:alert', (str) => {
            expect(str).to.equal('Invalid user name or password')
        })
    })

    const usuarios = require('../../fixtures/usuarios.json')
    usuarios.forEach(usuario => {
        it.only(`cadastrando usuário ${usuario.userName}`, () => {
            cy.cadastro(usuario.email,
                        usuario.fullName,
                        usuario.userName,
                        usuario.password)
        })
    });

    
})