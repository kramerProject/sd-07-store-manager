
const { Router } = require('express');
const { insertProduct, getProducts } = require('../service');
const { clientErrCodes, serverErrCodes, successCodes } = require('./statusCodes');

const productsController = Router();

productsController.get('/', async (_req, res, next) => {
  try {
    const productsPage = await getProducts();
  } catch(err) {
    console.log(err);
    res.status(serverErrCodes['Internal Server Error'])
      .json({message: err});
  }
});
productsController.get('/:id', async (_req, res, next) => {

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
    if (insertion.clientErr) {
      const { err, message } = insertion;
      return res.status(clientErrCodes[`${status}`])
        .json({ err: err, message: message });
    }
    if (!insertion) {
      const { err, message } = insertion;
      return res.status(clientErrCodes[`${status}`])
        .json({ err: err, message: message });
    }
    if (status === 'Unprocessable Entity') {
      const { err, message } = insertion;
      return res.status(clientErrCodes[`${status}`])
        .json({ err: err, message: message });
    }
    const { inserted } = insertion;
    return res.status(successCodes[`${insertion.status}`]).json(inserted);
  } catch(err) {
    console.log(err);
    return res.status(serverErrCodes['Internal Server Error'])
      .json({message: 'Internal Error'});
  }
});
// productsController.put('/:id', async (req, res, next) => {

// });
// productsController.delete('/:id', async (req, res, next) => {

// });

module.exports = productsController;
