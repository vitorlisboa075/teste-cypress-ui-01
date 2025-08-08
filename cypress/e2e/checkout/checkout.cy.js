describe('Fluxo de Checkout', () => {

  beforeEach(() => {
    cy.login('usuario@teste.com', 'SenhaForte123!');
  });

  it('Adicionar produto e finalizar compra', () => {
    cy.adicionarProdutoCarrinho('Camisa Azul');
    cy.get('.woocommerce-message').should('contain', 'foi adicionado no seu carrinho');
    cy.finalizarCompra({
      nome: 'João',
      sobrenome: 'Silva',
      endereco: 'Rua Teste 123',
      cidade: 'Lisboa',
      cep: '1000-000',
      telefone: '912345678',
      email: `joao${Date.now()}@teste.com`
    });
    cy.get('.woocommerce-notice').should('contain', 'Obrigado');
  });

  it('Remover produto do carrinho antes de finalizar', () => {
    cy.adicionarProdutoCarrinho('Camisa Azul');
    cy.visit('/carrinho/');
    cy.get('.remove').click();
    cy.get('.cart-empty').should('contain', 'Seu carrinho está vazio');
  });

});
