const { createProduct } = require('../services/productService');

describe('Criação de produto', () => {
  test('cria um produto com sucesso', async () => {
    const product = await createProduct({
      title: 'Arroz',
      quantity: 10,
      expirationDate: '2099-01-01'
    });

    expect(product).toHaveProperty('id');
    expect(product.title).toBe('Arroz');
    expect(product.quantity).toBe(10);
  });
});
