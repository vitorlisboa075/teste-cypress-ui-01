/// <reference types="cypress" />

describe('Funcionalidade: Adicionar Produtos ao Carrinho', () => {

    beforeEach(() => {
        cy.visit('produtos/')
    });

    it('Deve selecionar um produto da lista', () => {
        cy.get('[class="product-block grid"]')
            .contains('Ariel Roll Sleeve Sweatshirt')
            .click()

        cy.get('.product_title').should('contain', 'Ariel Roll Sleeve Sweatshirt')
    });

    it('Deve adicionar produto ao carrinho', () => {

        var qtd = 3;

        cy.get('[class="product-block grid"]')
            .contains('Argus All-Weather Tank')
            .click()
        cy.get('.button-variable-item-M').click()
        cy.get(':nth-child(2) > .value > .variable-items-wrapper > .variable-item').click()
        cy.get('.input-text').clear().type(qtd)
        cy.get('.single_add_to_cart_button').click()

        cy.get('.dropdown-toggle > .mini-cart-items').should('contain', qtd)

        cy.get('.woocommerce-message').should('contain', qtd + ' × “Argus All-Weather Tank” foram adicionados no seu carrinho.')

        cy.get('.dropdown-toggle > .text-skin > .icon-basket').click()
        cy.get('#cart > .dropdown-menu > .widget_shopping_cart_content > .mini_cart_content > .mini_cart_inner > .mcart-border > .total > .woocommerce-Price-amount > bdi')
            .should('contain', 'R$66,00')
    });

    it('Deve adicionar produto da Lista de Desejos ao carrinho', () => {

        cy.get('[class="product-block grid"]')
            .contains('Argus All-Weather Tank')
            .click()
        cy.get('.button-variable-item-M').click()
        cy.get(':nth-child(2) > .value > .variable-items-wrapper > .variable-item').click()
        cy.get('.summary > .yith-wcwl-add-to-wishlist > .yith-wcwl-add-button > .add_to_wishlist > .yith-wcwl-icon').click({ force: true })

        cy.get(':nth-child(2) > .text-skin > .count_wishlist').should('contain', '1')

        cy.get(':nth-child(2) > .text-skin > .count_wishlist').click()

        cy.get('#yith-wcwl-row-3649 > .product-name').should('contain', 'Argus All-Weather Tank')
        cy.get('#yith-wcwl-row-3649 > .product-price').should('contain', 'R$22,00')
        cy.get('#yith-wcwl-row-3649 > .product-stock-status').should('contain', 'In Stock')

        cy.get('.product_type_variation').click()
        cy.get('.close > .fa').click()

        cy.get('.dropdown-toggle > .mini-cart-items').should('contain', '1')
        cy.get('.woocommerce-message').should('contain', 'Product added to cart successfully')

        cy.get('.dropdown-toggle > .text-skin > .icon-basket').click()

        cy.get('#cart > .dropdown-menu > .widget_shopping_cart_content > .mini_cart_content > .mini_cart_inner > .mcart-border > .total > .woocommerce-Price-amount > bdi')
            .should('contain', 'R$22,00')
    });

    it('Deve validar ao tentar comprar sem selecionar Tamanho e Cor', () => {
        cy.get('[class="product-block grid"]')
            .contains('Argus All-Weather Tank')
            .click()
        cy.get('.single_add_to_cart_button').click()
        cy.on('window:alert', (text) => {
            expect(text).to.contains('Selecione uma das opções do produto antes de adicioná-lo ao carrinho.');
        });
    });

    it('Deve validar ao preencher Quantidade inválida', () => {
        cy.get('[class="product-block grid"]')
            .contains('Argus All-Weather Tank')
            .click()
        cy.get('.button-variable-item-M').click()
        cy.get(':nth-child(2) > .value > .variable-items-wrapper > .variable-item').click()
        cy.get('.input-text').clear().type('0')
        cy.get('.single_add_to_cart_button').click()

        cy.get('.input-text').then(($input) => {
            expect($input[0].validationMessage).to.contain('O valor deve ser maior ou igual a 1')
        })

        cy.get('.input-text').clear().type('1.5')
        cy.get('.single_add_to_cart_button').click()

        cy.get('.input-text').then(($input) => {
            expect($input[0].validationMessage).to.contain('Insira um valor válido')
        })

    });

    it('Deve validar ao tentar comprar produto sem estoque', () => {
        cy.get('[class="product-block grid"]')
            .contains('Ariel Roll Sleeve Sweatshirt')
            .click()
        cy.get('.button-variable-item-M').click()
        cy.get('.button-variable-item-Green').click()
        cy.get('.single_add_to_cart_button').click()

        cy.on('window:alert', (text) => {
            expect(text).to.contains('Desculpe, este produto não está disponível. Escolha uma combinação diferente.');
        });
    });

    it('Deve validar ao adicionar quantidade maior que a disponível', () => {
        cy.get('[class="product-block grid"]')
            .contains('Ajax Full-Zip Sweatshirt')
            .click()
        cy.get('.button-variable-item-M').click()
        cy.get('.button-variable-item-Red').click()
        cy.get('.input-text').clear().type('100')
        cy.get('.single_add_to_cart_button').click()

        cy.get('.input-text').then(($input) => {
            expect($input[0].validationMessage).to.contain('O valor deve ser menor ou igual a')
        })
    });

    it.only('Deve adicionar ao carrinho com Comando Customizado', () => {
        cy.addProdutos('Argus All-Weather Tank', 'M', 3)

        cy.addProdutos('Atlas Fitness Tank', 'XL', 5)
    });

});