const express = require('express');
const {
  postNewProduct,
  getAll,
  getById,
  putById,
  deleteById
} = require('../controller/productsController');

const router = express.Router();

router.get('/products', getAll);
router.get('/products/:id', getById);
router.post('/products', postNewProduct);
router.put('/products/:id', putById);
router.delete('/products/:id', deleteById);

module.exports = router;
