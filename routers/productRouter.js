const express = require('express');
const router = express.Router();
const { 
  SignProduct, 
  ProductById, 
  allProducts,
  setProduct, 
  excludeProduct} = require('../controllers/ProductController');

router.post('/', SignProduct);
router.get('/', allProducts);
router.get('/:id', ProductById);
router.put('/:id', setProduct);
router.delete('/:id', excludeProduct);

module.exports = router;