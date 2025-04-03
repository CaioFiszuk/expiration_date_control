const router = require('express').Router();
const { getExpiredProducts, deleteExpiredProduct } = require('../controllers/expiredProducts');

router.get('/', getExpiredProducts);
router.delete('/:expiredProductId', deleteExpiredProduct);

module.exports = router;