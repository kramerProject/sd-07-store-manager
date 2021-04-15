const { Router } = require('express');
const productService = require('../services/productService');
const { CREATED, OK, UNPROCESSABLE_ENTITY } = require('../helpers/status');
const { nameMiddleware, quantityMiddleware } = require ('../middlewares');

const productMiddleware = [nameMiddleware, quantityMiddleware];

const productRouter = new Router();

const MESSAGE = { 
  err: {
    code: 'invalid_data',
    message: 'Wrong id format',
  }
};

productRouter.post('/', productMiddleware, async (req, res) => {
  try {
    const { name, quantity } = req.body;
    const exists = await productService.getByName(name);
    if (exists) {
      return res.status(UNPROCESSABLE_ENTITY).json({
        err: {
          code: 'invalid_data',
          message: 'Product already exists',
        }
      });
    }
    const registeredProduct = await productService.registerProduct(name, quantity);
    res.status(CREATED).json(registeredProduct);
  } catch (err) {
    throw new Error(err);
  }
});

productRouter.get('/', async (_req, res) => {
  try {
    const productsData = await productService.getAll();
    res.status(OK).json({ products: productsData });
  } catch (err) {
    throw new Error(err);
  }
});

productRouter.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const productsData = await productService.getById(id);
    if (!productsData) {
      return res.status(UNPROCESSABLE_ENTITY).json(MESSAGE);
    }
    res.status(OK).json(productsData);
  } catch (err) {
    throw new Error(err);
  }
});

productRouter.put('/:id', productMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, quantity } = req.body;
    await productService.updateProduct(id, name, quantity);
    const updatedProduct = await productService.getByName(name);
    res.status(OK).json(updatedProduct);
  } catch (err) {
    throw new Error(err);
  }
});

productRouter.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const exists = await productService.getById(id);
    if (!exists) return res.status(UNPROCESSABLE_ENTITY).json(MESSAGE);
    await productService.removeProduct(id);
    res.status(OK).json(exists);
  } catch (err) {
    throw new Error(err);
  }
});

module.exports = productRouter;
