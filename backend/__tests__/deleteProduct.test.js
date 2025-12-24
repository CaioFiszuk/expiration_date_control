const { createProduct, deleteProduct } = require('../services/productService');

describe('Delete de produto', () => {
  test('remove um produto existente', async () => {
    const product = await createProduct({
      title: 'Biscoito',
      quantity: 3,
      expirationDate: '2099-01-01'
    });

    const result = await deleteProduct(product.id);

    expect(result).toBe(true);
  });
});
