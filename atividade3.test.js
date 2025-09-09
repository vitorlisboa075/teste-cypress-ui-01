const validarSenha = require('./atividade3');

test('Senha válida deve retornar true', () => {
  expect(validarSenha('Teste123')).toBe(true);
});

test('Senha sem número deve retornar false', () => {
  expect(validarSenha('SomenteLetras')).toBe(false);
});

test('Senha curta deve retornar false', () => {
  expect(validarSenha('123')).toBe(false);
});
