const { Router } = require('express');
const { purchaseInsertion } = require('../service');
const { clientErrCodes, serverErrCodes, successCodes } = require('./statusCodes');

const purchaseController = Router();

const BAD_INPUT = 'Unprocessable Entity';

purchaseController.post('/', async (req, res, next) => {
  try {
    const { body } = req;
    // for (const product of body) {
    //   const { productId } = product;
    //   const validId = getOneProduct(productId);
    //   if (!validId.status === 'OK') {
    //     const { clientErr, err, message, status } = validId;
    //     next({ err, message, status, clientErr });
    //   }
    // }
    const insertionRes = await purchaseInsertion(body);
    if (insertionRes.clientErr) {
      return next(insertionRes);
    }
    return res.status(successCodes['OK']).json( insertionRes );
  } catch (err) {
    console.log(err);
    next({ status: clientErrCodes[`${BAD_INPUT}`], message: 'Missing prameter(s)'});
  }
});

module.exports = purchaseController;
