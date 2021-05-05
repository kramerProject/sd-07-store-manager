const { Router } = require('express');
const service = require('../services/storeService');

const products = Router();

const statusCode = {
  OK: 200,
  CREATED: 201,
};

products.get('/', async (_req, res) => {
  const allProducts = await service.getAll();
  return res.status(statusCode.OK).json(allProducts);
});

products.post('/', async (req, res, next) => {
  try {
    const insertedProduct = await service.newProduct(req.body);
    return res.status(statusCode.CREATED).json(insertedProduct);
  } catch (e) {
    next(e);
  }
});

products.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const product = await service.getById(id);
    return res.status(statusCode.OK).json(product);
  } catch (e) {
    next(e);
  }
});

products.put('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const updatedProduct = await service.updateProduct(id, req.body);
    return res.status(statusCode.OK).json(updatedProduct);
  } catch(e) {
    next(e);
  }
});

products.delete('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    await service.deleteProduct(id);
    return res.status(statusCode.OK).end();
  } catch(e) {
    next(e);
  }
});

module.exports = products;
