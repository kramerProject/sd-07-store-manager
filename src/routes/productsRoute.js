const express = require('express');
const {
  handleNewProduct,
  getAll,
  getById,
  updateById,
  deleteById,
} = require('../controllers/productsController');

const router = express.Router();

router.post('/products', handleNewProduct);
router.get('/products', getAll);
router.get('/products/:id', getById);
router.put('/products/:id', updateById);
router.delete('/products/:id', deleteById);

module.exports = router;
