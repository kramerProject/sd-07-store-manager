const { Router } = require('express');
const { validateProduct } = require('../confings/validations');
const productService = require('../models/productService');
const { status } = require('../confings/status');

const products = new Router();

products.post('/', validateProduct, async (request, response) => {
  const { body } = request;
  const createdProduct = await productService.createProduct(body);

  response.status(status.created).json(createdProduct);
});

module.exports = products;
