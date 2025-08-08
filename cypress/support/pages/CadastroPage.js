class CadastroPage {
  visit() {
    cy.visit('/minha-conta/');
  }

  preencherNome(nome) {
    cy.get('#reg_username').type(nome);
  }

  preencherEmail(email) {
    cy.get('#reg_email').type(email);
  }

  preencherSenha(senha) {
    cy.get('#reg_password').type(senha);
  }

  clicarRegistrar() {
    cy.get(':input[name="register"]').click();
  }

  mensagemSucesso() {
    return cy.get('.woocommerce-MyAccount-content');
  }

  mensagemErro() {
    return cy.get('.woocommerce-error');
  }
}

export default new CadastroPage();
