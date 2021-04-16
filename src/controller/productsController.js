
const { Router } = require('express');
const { insertProduct, getProducts,
  getOneProduct, updateProduct } = require('../service');
const { clientErrCodes, serverErrCodes, successCodes } = require('./statusCodes');

const productsController = Router();

productsController.get('/', async (_req, res, next) => {
  try {
    const productsPage = await getProducts();
    return productsPage.err
      ? next(productsPage.err)
      : res.status(successCodes[`${productsPage.status}`])
        .json({ products: productsPage.products });
  } catch(err) {
    console.log(err);
    next(serverErrCodes['Internal Server Error'], err);
  }
});
productsController.get('/:id', async (req, res, next) => {
  try {
    const BAD_INPUT = 'Unprocessable Entity';
    if (!req.params) {
      next({ status: clientErrCodes[`${BAD_INPUT}`], message: 'Missing id prameter'});
    }
    const { id } = req.params;
    const product = await getOneProduct(id);
    const { err, message, status } = product;
    return product.clientErr
      ? next({ err, message, status, clientErr: product.clientErr })
      : res.status(successCodes[`${product.status}`])
        .json(product.product);
  } catch(err) {
    console.log(err);
    next(serverErrCodes['Internal Server Error'], err);
  }
});
productsController.post('/', async (req, res, next) => {
  try {
    if (!req.body.name || !`${req.body.quantity}`) {
      return res.status(clientErrCodes['Bad Request'])
        .json({ message: 'Name and Quantity are mandatory' });
    }
    const { name, quantity } = req.body;
    const insertion = await insertProduct(name, quantity);
    const { status } = insertion;
    if (status !== 'Created') {
      return next(insertion);
    }
    const { inserted } = insertion;
    return res.status(successCodes[`${status}`]).json(inserted);
  } catch(err) {
    console.log(err);
    return next({ err, status, message: 'Internal Error' });
  }
});
productsController.put('/:id', async (req, res, next) => {
  try {
    const BAD_INPUT = 'Unprocessable Entity';
    if (!req.params || !req.body.name || !`${req.body.quantity}`) {
      next({ status: clientErrCodes[`${BAD_INPUT}`], message: 'Missing id prameter'});
    }
    const { id } = req.params;
    const { name, quantity } = req.body;
    const productUpdated = await updateProduct(name, id, quantity);
    const { err, message, status } = productUpdated;
    return productUpdated.clientErr
      ? next({ err, message, status, clientErr: productUpdated.clientErr })
      : res.status(successCodes[`${productUpdated.status}`])
        .json(productUpdated.product);
  } catch (err) {
    console.log(err);
    next(serverErrCodes['Internal Server Error'], err);
  }
});
// productsController.delete('/:id', async (req, res, next) => {

// });

// app.use(errorMidlleware);

module.exports = productsController;
