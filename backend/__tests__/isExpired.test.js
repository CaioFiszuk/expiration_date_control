const isExpired = require('../utils/isExpired');

describe('Regra de vencimento', () => {
  test('produto vencido retorna true', () => {
    expect(isExpired('2023-01-01')).toBe(true);
  });

  test('produto futuro retorna false', () => {
    expect(isExpired('2099-01-01')).toBe(false);
  });

  test('produto que vence hoje NÃO é vencido', () => {
    const today = new Date().toISOString().slice(0, 10);
    expect(isExpired(today)).toBe(false);
  });
});
