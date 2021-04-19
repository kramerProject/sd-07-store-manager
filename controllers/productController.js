const express = require('express');

const router = express.Router();

const service = require('../services/productService');

const productMiddleware = require('../middlewares/productMiddleware');
const idMiddleware = require('../middlewares/idMiddleware');

const SUCCESS = 200;
const CREATE = 201;

router.post('/products', productMiddleware, async (request, response) => {

  const { name, quantity } = request.body;

  const product = await service.createNewProduct(name, quantity);

  response.status(CREATE).json(product);
});

router.get('/products', async (_request, response) => {
  response.status(SUCCESS).json(await service.getAllProducts());
});

router.get('/products/:id', idMiddleware, async (request, response) => {
  const { id } = request.params;
  response.status(SUCCESS).json(await service.findByProductId(id));
});

router.put('/products/:id', productMiddleware, idMiddleware,
  async (request, response) => {
    const { id } = request.params;
    const { name, quantity} = request.body;
    response.status(SUCCESS).json(await service.updateProduct(id, name, quantity));
  });

router.delete('/products/:id', idMiddleware, async (request, response) => {
  const { id } = request.params;

  response.status(SUCCESS).json(await service.deleteProduct(id));
});

module.exports = router;
