const soma = require('./atividade1');

test('soma 2 + 3 deve ser 5', () => {
  expect(soma(2, 3)).toBe(5);
});

test('soma -1 + 1 deve ser 0', () => {
  expect(soma(-1, 1)).toBe(0);
});
