const express = require('express');

const {
  validNameMiddleware,
  validSizeNameMiddleware,
  validQuantityMiddleware,
  validIdProductMiddleware,
} = require('../middlewares');

const {
  findAllProducts,
  findIdProducts,
  addProducts,
  editProducts,
  deleteProducts,
} = require('../controllers');


function routerProduct(_req, _res, next){
  const router = express.Router();

  router.get('/products', findAllProducts);
  router.get('/products/:id', findIdProducts);
  router.post(
    '/products',
    validNameMiddleware,
    validSizeNameMiddleware,
    validQuantityMiddleware,
    addProducts,
  );
  router.put(
    '/products/:id',
    validSizeNameMiddleware,
    validQuantityMiddleware,
    editProducts
  );

  router.delete(
    '/products:id',
    validIdProductMiddleware,
    validQuantityMiddleware, 
    deleteProducts
  );
  next();
}

module.exports = { routerProduct };
