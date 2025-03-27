const router = require('express').Router();
const { createProduct, getProducts, deleteProduct, updateProduct } = require('../controllers/products');

router.post('/', createProduct);
router.get('/', getProducts);
router.delete('/:productId', deleteProduct);
router.patch('/:productId', updateProduct);

module.exports = router;