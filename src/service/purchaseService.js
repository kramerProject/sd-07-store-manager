const { validateQtty, validateProductId } = require('./purchaseHandlers');
const { getOnePurch, getPurchaseList,
  insertPurchase, updtPurch } = require('../models');

const BAD_INPUT = 'Unprocessable Entity';

const getPurchase = async () => {
  const purchaseList = await getPurchaseList();
  return purchaseList
    ? { purchases: purchaseList, status: 'OK' }
    : { err: 'no products in database', status: BAD_INPUT };
};

const getOnePurchase = async (id) => {
  const purchRes = await getOnePurch(id);
  return purchRes.error
    ? { err: 'not_found', message: 'Sale not found', status: 'Not Found',
      clientErr: true , error: purchRes.error }
    : { status: 'OK', sale: purchRes }; 
};

const purchaseInsertion = async (productList) => {
  for (const product of productList) {
    const { productId, quantity } = product;
    const invalidQty = validateQtty(quantity);
    if (invalidQty) {
      return invalidQty;
    }
    const invalidPdtId = await validateProductId(productId);
    console.log('LINE 31: ', invalidPdtId);
    if (invalidPdtId) {
      return { };
    }
  }
  const insertionResp = await insertPurchase(productList);
  const [res] = await Promise.resolve(insertionResp);
  return res;
};

const updatePurchase = async (purchId, pdtList) => {
  const validPurch = await getOnePurch(purchId);
  if (validPurch.status !== 'OK') {
    return { err: 'not_found', message: 'Sale not found', status: 'Not Found',
      clientErr: true , error: validPurch.error };
  }

  for (const product of pdtList) {
    const { productId, quantity } = product;
    const invalidQty = validateQtty(quantity);
    if (invalidQty) {
      return invalidQty;;
    }
    const invalidPdtId = await validateProductId(productId);
    if (invalidPdtId) {
      return invalidPdtId;
    }
  }
  const updatedPurchase = await updtPurch(purchId, pdtList);
  if (updatedPurchase.error) {
    return updatedPurchase;
  }
  return { _id: purchId, itensSold: pdtList, status: 'OK' };

};

module.exports = {
  getOnePurchase,
  getPurchase,
  purchaseInsertion,
  updatePurchase
};
