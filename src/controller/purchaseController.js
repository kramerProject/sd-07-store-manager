const { Router } = require('express');
const { delPurchase, getOnePurchase, getPurchase, purchaseInsertion, updatePurchase }
  = require('../service');
const { clientErrCodes, serverErrCodes, successCodes } = require('./statusCodes');

const purchaseController = Router();

const ID_MISSING = 'Not Found';
const BAD_INPUT = 'Unprocessable Entity';

purchaseController.put('/:id', async (req, res, next) => {
  try {
    const { id }= req.params;
    const [...pdtList] = req.body;
    const purchUpdate = await updatePurchase(id, pdtList);
    if (purchUpdate.status !== 'OK') {
      return next(purchUpdate);
    }
    const { status } = purchUpdate;
    return res.status(successCodes[`${status}`])
      .json(purchUpdate);
  } catch (err) {
    return next(serverErrCodes['Internal Server Error']);
  }
});

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

purchaseController.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const purchaseDeleted = await delPurchase(id);
    const { status } = purchaseDeleted;
    if (status !== 'OK') {
      const { err, message, status } = purchaseDeleted;
      return next({ err, message, status, clientErr: purchaseDeleted.clientErr });
    }
    return res.status(successCodes[`${status}`])
      .json({ });
  } catch (err) {
    console.log(err);
    return next({ err: err, status: ID_MISSING });
  }
});

module.exports = purchaseController;
