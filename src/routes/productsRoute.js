const express = require('express');
const {
  handleNewProduct,
  getAll,
  getById,
  updateById,
} = require('../controllers/productsController');

const router = express.Router();

router.post('/products', handleNewProduct);
router.get('/products', getAll);
router.get('/products/:id', getById);
router.put('/products/:id', updateById);

module.exports = router;
