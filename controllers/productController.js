const express = require('express');

const router = express.Router();

const service = require('../services/productService');

const productMiddleware = require('../middlewares/productMiddleware');

const SUCCESS = 200;

router.post('/products', productMiddleware, async (request, response) => {

  const { name, quantity } = request.body;

  const product = await service.createNewProduct(name, quantity);

  response.status(SUCCESS).json(product);
});


module.exports = router;
