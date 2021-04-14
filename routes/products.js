const express = require('express');

const router = express.Router();

const {
  getProducts,
  getProductsId,
  postProduct,
  putProduct,
  deleteProduct,
} = require('../controllers');
  
const {
  validatedName,
  validatedQuantity,
  validatedQuantityString,
  productExists,
} = require('../middlewares');

router.get('/', getProducts);

router.get('/:id', getProductsId);

router.post(
  '/',
  [
    validatedName,
    validatedQuantity,
    validatedQuantityString,
    // productExists
  ],
  postProduct,
);

router.put('/:id',
  [
    validatedName,
    validatedQuantity,
    validatedQuantityString
  ],
  putProduct
);

router.delete('/:id', 
  [
    validatedName,
    validatedQuantity,
    validatedQuantityString
  ],
  deleteProduct
);

module.exports = router;