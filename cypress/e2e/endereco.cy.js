/// <reference types="cypress" />
import EnderecoPage from '../support/page-objects/endereco.page'
const dadosEnderecoFaturamento = require('../fixtures/enderecoFaturamento.json')
const dadosEnderecoEntrega = require('../fixtures/enderecoEntrega.json')

describe('Funcionalidade Endereços - Faturamento e Entrega', () => {

    var faker = require('faker');

    beforeEach(() => {
        cy.visit('minha-conta')
        cy.fixture('perfil').then(dados =>{
            cy.login(dados.usuario, dados.senha)
        })
        
    });

    it('Deve fazer cadastro do local do faturamento', () => {
        EnderecoPage.editarEnderecoFaturamento('Luiz', 'Guilherme', 'EBAC', 'Avenida Brasil', '3010', 'São Paulo', 'São Paulo', '84430000', '4234232020', 'mail@test.com')
        cy.get('.woocommerce-message').should('contain', 'Endereço alterado com sucesso.')
    });

    it('Deve fazer cadastro do local do faturamento - Usando Arquivo de Dados', () => {
        EnderecoPage.editarEnderecoFaturamento(
            dadosEnderecoFaturamento[1].nome,
            dadosEnderecoFaturamento[1].sobrenome,
            dadosEnderecoFaturamento[1].empresa,
            dadosEnderecoFaturamento[1].endereco,
            dadosEnderecoFaturamento[1].numero,
            dadosEnderecoFaturamento[1].cidade,
            dadosEnderecoFaturamento[1].estado,
            dadosEnderecoFaturamento[1].cep,
            dadosEnderecoFaturamento[1].telefone,
            dadosEnderecoFaturamento[1].email)
        cy.get('.woocommerce-message').should('contain', 'Endereço alterado com sucesso.')
    });

    it('Deve fazer cadastro do local de entrega', () => {
        EnderecoPage.editarEnderecoEntrega('Lewiz', 'Guilherme', 'EBAC', 'Avenida Brasil', '3010', 'São Paulo', 'São Paulo', '84430000')
        cy.get('.woocommerce-message').should('contain', 'Endereço alterado com sucesso.')
    });

    it('Deve fazer cadastro do local de entrega - Usando Arquivo de Dados e Faker', () => {

        let nameFaker = faker.name.firstName()

        EnderecoPage.editarEnderecoEntrega(
            nameFaker,
            dadosEnderecoEntrega[0].sobrenome,
            dadosEnderecoEntrega[0].empresa,
            dadosEnderecoEntrega[0].endereco,
            dadosEnderecoEntrega[0].numero,
            dadosEnderecoEntrega[0].cidade,
            dadosEnderecoEntrega[0].estado,
            dadosEnderecoEntrega[0].cep
            )
        cy.get('.woocommerce-message').should('contain', 'Endereço alterado com sucesso.')
    });
});