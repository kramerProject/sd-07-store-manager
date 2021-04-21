const express = require('express');
const {
  createNewProduct,
  getAllProducts,
  getProductById,
  updateProductById,
  deleteProductById,
} = require('../controllers');

const router = express.Router();

router.post('/products', createNewProduct);
router.get('/products', getAllProducts);
router.get('/products/:id', getProductById);
router.put('/products/:id', updateProductById);
router.delete('/products/:id', deleteProductById);

module.exports = router;
