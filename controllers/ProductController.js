const express = require('express');
const router = express.Router();
const productService = require('../services/ProductService');

const {
  productNameVerify,
  productExists,
  productQuantityVerify,
  productQuantityTypeVerify,
} = require('../middlewares/ProductMiddleware');

const OK = 200;
const CREATED = 201;
const BAD_REQUEST = 400;
const NOT_FOUND = 404;

router.post('/',
  productNameVerify,
  productQuantityTypeVerify,
  productQuantityVerify,
  productExists,
  async (req, res) => {
    const { body } = req;
    const newProduct = await productService.create(body);
    res.status(CREATED).json(newProduct);
  }
);

router.get('/', async (_req, res) => {
  const productList = await productService.getAll();
  res.status(OK).json(productList);
});

module.exports = router;
