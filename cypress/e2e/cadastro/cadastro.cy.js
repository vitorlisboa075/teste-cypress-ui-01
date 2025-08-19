import CadastroPage from '../../support/pages/CadastroPage';

describe('Fluxo de Criação de Conta', () => {
  
  it('Criar conta com dados válidos', () => {
    CadastroPage.visit();
    CadastroPage.preencherFormulario({
      nome: `Usuario${Date.now()}`,
      email: `usuario${Date.now()}@teste.com`,
      senha: 'SenhaForte123!'
    });
    CadastroPage.clicarRegistrar();
    CadastroPage.mensagemSucesso().should('contain', 'Olá');
  });

  it('Tentativa com e-mail já cadastrado', () => {
    CadastroPage.visit();
    CadastroPage.preencherFormulario({
      nome: `UsuarioExistente${Date.now()}`,
      email: 'usuario@teste.com',
      senha: 'SenhaForte123!'
    });
    CadastroPage.clicarRegistrar();
    CadastroPage.mensagemErro().should('contain', 'Uma conta já está registrada');
  });

  it('Campos obrigatórios não preenchidos', () => {
    CadastroPage.visit();
    CadastroPage.preencherFormulario({}); // todos vazios
    CadastroPage.clicarRegistrar();
    CadastroPage.mensagemErro().should('contain', 'Erro');
  });

});
