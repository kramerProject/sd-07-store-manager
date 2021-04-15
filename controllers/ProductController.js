const express = require('express');
const router = express.Router();
const productService = require('../services/ProductService');
const productModel = require('../models/ProductModel');
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
    const newProduct = await productModel.create(body);
    res.status(CREATED).json(newProduct);
  }
);

router.get('/', function (req, res) {
  res.status(OK).json('OK');
});

module.exports = router;
