const { validateQtty, validateProductId } = require('./purchaseHandlers');
const { delPurch, getOnePurch, getPurchaseList,
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

const delPurchase = async (purchaseId) => {
  const purchaseExists = await getOnePurch(purchaseId);
  if(purchaseExists.status !== 'OK') {
    const { clientErr, error } = purchaseExists;
    return { err: 'invalid_data', message: 'Sale not found',
      status: BAD_INPUT, clientErr , error };
  }
  const deletionRes = await delPurch(purchaseId);
  return deletionRes.result.ok === 1
    ? { status: 'OK' }
    : { err: 'invalid_data', status: BAD_INPUT,
      clientErr: true, message: 'Wrong sale ID format' };
};

const purchaseInsertion = async (productList) => {
  for (const product of productList) {
    const { productId, quantity } = product;
    const invalidQty = validateQtty(quantity);
    if (invalidQty) {
      return invalidQty;
    }
    const invalidPdtId = await validateProductId(productId);
    if (invalidPdtId) {
      return { status: BAD_INPUT, err: 'invalid_data', clientErr: true,
        message: 'Wrong product ID format' };
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
  delPurchase,
  getOnePurchase,
  getPurchase,
  purchaseInsertion,
  updatePurchase
};
