const { Router } = require('express');
const { getOnePurchase, getPurchase, purchaseInsertion } = require('../service');
const { clientErrCodes, successCodes } = require('./statusCodes');

const purchaseController = Router();

const BAD_INPUT = 'Unprocessable Entity';

purchaseController.post('/', async (req, res, next) => {
  try {
    const { body } = req;
    const insertionRes = await purchaseInsertion(body);
    if (insertionRes.clientErr) {
      return next(insertionRes);
    }
    return res.status(successCodes['OK']).json( insertionRes );
  } catch (err) {
    console.log(err);
    return next({ status: clientErrCodes[`${BAD_INPUT}`],
      message: 'Missing prameter(s)'});
  }
});

purchaseController.get('/', async (_req, res, next) => {
  try {
    const salesRes = await getPurchase();
    return salesRes.err
      ? next(salesRes)
      : res.status(successCodes['OK']).json({ sales: salesRes.purchases });
  } catch (err) {
    console.log(err);
    return next(err);
  }
});

purchaseController.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const purchase = await getOnePurchase(id);
    return purchase.err
      ? next(purchase)
      : res.status(successCodes[`${purchase.status}`]).json({ sale: purchase.sale });
  } catch (err) {
    console.log(err);
    return next(err);
  }
});

module.exports = purchaseController;
