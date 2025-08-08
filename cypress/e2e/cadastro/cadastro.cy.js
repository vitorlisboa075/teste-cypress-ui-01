import CadastroPage from '../../support/pages/CadastroPage';

describe('Fluxo de Criação de Conta', () => {
  
  it('Criar conta com dados válidos', () => {
    CadastroPage.visit();
    CadastroPage.preencherNome('UsuarioTeste');
    CadastroPage.preencherEmail(`usuario${Date.now()}@teste.com`);
    CadastroPage.preencherSenha('SenhaForte123!');
    CadastroPage.clicarRegistrar();
    CadastroPage.mensagemSucesso().should('contain', 'Olá');
  });

  it('Tentativa com e-mail já cadastrado', () => {
    CadastroPage.visit();
    CadastroPage.preencherNome('UsuarioExistente');
    CadastroPage.preencherEmail('usuario@teste.com');
    CadastroPage.preencherSenha('SenhaForte123!');
    CadastroPage.clicarRegistrar();
    CadastroPage.mensagemErro().should('contain', 'Uma conta já está registrada');
  });

  it('Campos obrigatórios não preenchidos', () => {
    CadastroPage.visit();
    CadastroPage.clicarRegistrar();
    CadastroPage.mensagemErro().should('contain', 'Erro');
  });

});
