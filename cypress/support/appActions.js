Cypress.Commands.add('login', (usuario, senha) => {
  cy.visit('/minha-conta/');
  cy.get('#username').type(usuario);
  cy.get('#password').type(senha);
  cy.get(':input[name="login"]').click();
});

Cypress.Commands.add('adicionarProdutoCarrinho', (produto) => {
  cy.visit('/produtos/');
  cy.contains(produto).click();
  cy.get('.single_add_to_cart_button').click();
});

Cypress.Commands.add('finalizarCompra', (dados) => {
  cy.get('.checkout-button').click();
  cy.get('#billing_first_name').type(dados.nome);
  cy.get('#billing_last_name').type(dados.sobrenome);
  cy.get('#billing_address_1').type(dados.endereco);
  cy.get('#billing_city').type(dados.cidade);
  cy.get('#billing_postcode').type(dados.cep);
  cy.get('#billing_phone').type(dados.telefone);
  cy.get('#billing_email').type(dados.email);
  cy.get('#place_order').click();
});
