const express = require('express');
const router = express.Router();
const { 
  SignProduct, 
  ProductById, 
  allProducts } = require('../controllers/ProductController');

router.post('/', SignProduct);
router.get('/', allProducts);
router.get('/:id', ProductById);

module.exports = router;