/// <reference types="cypress" />

describe('Funcionalidade: Pré Cadastro', () => {

    var faker = require('faker');

    let nameFaker = faker.name.firstName()
    let lastNameFaker = faker.name.lastName()

    beforeEach(() => {
        cy.visit('minha-conta/')
    });

    it('Deve completar o pré cadastro com sucesso', () => {

        let emailFaker = faker.internet.email(nameFaker, { allowSpecialCharacters: true })

        cy.get('#reg_email').type(emailFaker)
        cy.get('#reg_password').type('password_test')
        cy.get(':nth-child(4) >.button').click()

        cy.get('.woocommerce-MyAccount-navigation-link--edit-account > a').click()
        cy.get('#account_first_name').type(nameFaker)
        cy.get('#account_last_name').type(lastNameFaker)
        cy.get('#account_display_name').clear().type(nameFaker + ' ' + lastNameFaker)
        cy.get('.woocommerce-Button').click()

        cy.get('.woocommerce-message').should('contain', 'Detalhes da conta modificados com sucesso.')
        cy.get('a > .hidden-xs').should('contain', 'Welcome ' + nameFaker + ' ' + lastNameFaker)
    });

    it('Deve exibir validação de obrigatoriedade para o campo Email address na tela Register', () => {

        cy.get('#reg_password').type('password_test')
        cy.get(':nth-child(4) >.button').click()

        cy.get('.woocommerce-error').should('contain', 'Erro: Informe um endereço de e-mail válido.')
    });

    it('Deve exibir validação de obrigatoriedade para o campo Senha na tela Register', () => {
        cy.get('#reg_email').type('teste@mail.com.br')
        cy.get(':nth-child(4) >.button').click()

        cy.get('.woocommerce-error').should('contain', 'Erro: Digite a senha da conta.')
    });

    it('Deve exibir validação de E-mail com formatos inválidos na tela Register', () => {
        cy.get('#reg_email').type('teste')
        cy.get('#reg_password').type('password_test')
        cy.get(':nth-child(4) >.button').click()

        cy.get('#reg_email').then(($input) => {
            expect($input[0].validationMessage).to.contain('Inclua um "@" no endereço de e-mail.')
        })

        cy.get('#reg_email').clear().type('teste@')
        cy.get(':nth-child(4) >.button').click()

        cy.get('#reg_email').then(($input) => {
            expect($input[0].validationMessage).to.contain('Insira uma parte depois de', '@')
        })

    });

    it('Deve exibir validação de Usuário já cadastrado na tela Register', () => {
        cy.get('#reg_email').type('aluno_ebac@teste.com')
        cy.get('#reg_password').type('teste@teste.com')
        cy.get(':nth-child(4) >.button').click()

        cy.get('.woocommerce-error').should('contain', 'Erro: Uma conta já está registrada com seu endereço de e-mail. Faça login.')

    });

    it('Deve exibir validação de campos obrigatórios na tela Detalhes da Conta', () => {

        let emailFaker = faker.internet.email(nameFaker, { allowSpecialCharacters: true })

        cy.get('#reg_email').type(emailFaker)
        cy.get('#reg_password').type('password_test')
        cy.get(':nth-child(4) >.button').click()

        cy.get('.woocommerce-MyAccount-navigation-link--edit-account > a').click()
        cy.get('#account_first_name').clear()
        cy.get('#account_last_name').clear()
        cy.get('#account_display_name').clear()
        cy.get('#account_email').clear()
        cy.get('.woocommerce-Button').click()

        cy.get('.woocommerce-error').should('contain', 'Nome', 'Sobrenome', 'Nome de exibição', 'Endereço de e-mail', 'é um campo obrigatório')

    });

    it('Deve exibir validação de Usuário já cadastrado na tela Detalhes da Conta', () => {
        
        let emailFaker = faker.internet.email(nameFaker, { allowSpecialCharacters: true })

        cy.get('#reg_email').type(emailFaker)
        cy.get('#reg_password').type('password_test')
        cy.get(':nth-child(4) >.button').click()

        cy.get('.woocommerce-MyAccount-navigation-link--edit-account > a').click()
        cy.get('#account_first_name').type('João')
        cy.get('#account_last_name').type('Soares')
        cy.get('#account_email').clear().type('aluno_ebac@teste.com')
        cy.get('.woocommerce-Button').click()

        cy.get('.woocommerce-error').should('contain', 'Este endereço de e-mail já está registrado.')

    });

    it.only('Deve completar o pré-cadastro com sucesso usando Comandos Customizados', () => {
        let emailFaker2 = faker.internet.email()
        cy.preCadastro(emailFaker2, 'senha_teste', 'Lewiz', 'Hamilton')

        cy.get('.woocommerce-message').should('contain', 'Detalhes da conta modificados com sucesso.')
    });
});