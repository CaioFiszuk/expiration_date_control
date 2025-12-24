const { createProduct, updateProduct } = require('../services/productService');

describe('Update de produto', () => {
  test('atualiza um produto existente', async () => {
    const product = await createProduct({
      title: 'Leite',
      quantity: 5,
      expirationDate: '2099-01-01'
    });

    const updated = await updateProduct(product.id, {
      title: 'Leite Integral',
      quantity: 8,
      expirationDate: '2099-02-01'
    });

    expect(updated.title).toBe('Leite Integral');
    expect(updated.quantity).toBe(8);
  });
});
