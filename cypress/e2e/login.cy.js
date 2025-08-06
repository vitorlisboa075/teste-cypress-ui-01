/// <reference types="cypress" />
const perfil = require('../fixtures/perfil.json')

context('Funcionalidade: Login', () => {

    var faker = require('faker');

    let emailFaker = faker.internet.email()
    let firstNameFaker = faker.name.firstName()
    let lastNameFaker = faker.name.lastName()
    let userNameFaker = firstNameFaker + ' ' + lastNameFaker
    let senhaFaker = faker.lorem.word(10)


    //Obs.: a função fullName() está presente somente nas versões mais recentes do faker

    beforeEach(() => {
        cy.visit('minha-conta/')
    });

    afterEach(() => {
        cy.screenshot()
    });

    it('Deve realizar login com sucesso', () => {
        cy.get('#username').type('aluno_ebac@teste.com')
        cy.get('#password').type('teste@teste.com')
        cy.get('.woocommerce-form > .button').click()
        cy.get('.page-title').contains('Minha Conta', { matchCase: false })
        cy.get('.woocommerce-MyAccount-content > :nth-child(2)').should('contain', 'Olá, teste_aluno20')
        cy.get('a > .hidden-xs').should('contain', 'Welcome teste_aluno20', { matchCase: false })
    })

    it('Deve realizar login com sucesso com arquivo de dados', () => {
        cy.get('#username').type(perfil.usuario)
        cy.get('#password').type(perfil.senha)
        cy.get('.woocommerce-form > .button').click()
        cy.get('.page-title').contains('Minha Conta', { matchCase: false })
        cy.get('.woocommerce-MyAccount-content > :nth-child(2)').should('contain', 'Olá, teste_aluno20')
        cy.get('a > .hidden-xs').should('contain', 'Welcome teste_aluno20', { matchCase: false })
    })

    it('Deve realizar login com sucesso com Fixture', () => {
        cy.fixture('perfil').then(dados => {
            cy.get('#username').type(dados.usuario)
            cy.get('#password').type(dados.senha, {log: false}) //Para não exibir senha
            cy.get('.woocommerce-form > .button').click()
            cy.get('.page-title').contains('Minha Conta', { matchCase: false })
            cy.get('.woocommerce-MyAccount-content > :nth-child(2)').should('contain', 'Olá, teste_aluno20')
            cy.get('a > .hidden-xs').should('contain', 'Welcome teste_aluno20', { matchCase: false })
        }) //arquivo json na pasta fixture
        
    })

    it('Deve exibir erro ao inserir e-mail inválido', () => {
        cy.get('#username').type(emailFaker)
        cy.get('#password').type('teste@teste.com')
        cy.get('.woocommerce-form > .button').click()
        cy.get('.woocommerce-error').should('contain', 'Endereço de e-mail desconhecido. Verifique novamente ou tente seu nome de usuário.')
    });

    it('Deve exibir erro ao inserir o Nome de Usuário inválido', () => {
        cy.get('#username').type(userNameFaker)
        cy.get('#password').type('teste@teste.com')
        cy.get('.woocommerce-form > .button').click()
        cy.get('.woocommerce-error').should('contain', 'O usuário ' + userNameFaker + ' não está registrado neste site. Se você não está certo de seu nome de usuário, experimente o endereço de e-mail.', { matchCase: false })
    });

    it('Deve exibir erro ao inserir Senha inválida', () => {
        cy.get('#username').type('aluno_ebac@teste.com')
        cy.get('#password').type(senhaFaker)
        cy.get('.woocommerce-form > .button').click()
        cy.get('.woocommerce-error').should('contain', 'Erro: A senha fornecida para o e-mail aluno_ebac@teste.com está incorreta. Perdeu a senha?')
    });

    it('Deve exibir validação de obrigatoriedade para o campo Nome de Usuário', () => {
        cy.get('#password').type('teste@teste.com')
        cy.get('.woocommerce-form > .button').click()
        cy.get('.woocommerce-error').should('contain', 'Erro: Nome de usuário é obrigatório.')
    });

    it('Deve exibir validação de obrigatoriedade para o campo Senha', () => {
        cy.get('#username').type('aluno_ebac@teste.com')
        cy.get('.woocommerce-form > .button').click()
        cy.get('.woocommerce-error').should('contain', 'Erro: O campo da senha está vazio.')
    });
})