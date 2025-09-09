const ehPar = require('./atividade2');

test('4 deve ser par', () => {
  expect(ehPar(4)).toBe(true);
});

test('5 deve ser ímpar', () => {
  expect(ehPar(5)).toBe(false);
});
