const { authPdtAmount } = require('./validateInputs');
const { getOnePurch, getOnePdt, getPurchaseList, insertPurchase } = require('../models');

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
    const qtyValidation = authPdtAmount(quantity);
    if (qtyValidation) {
      // project requirements is not favorable to function reuse
      return { err: 'invalid_data', status: BAD_INPUT,
        clientErr: true, message: 'Wrong product ID or invalid quantity' };;
    }
    const pdtIdValidation = await getOnePdt(productId);
    if (!pdtIdValidation) {
      return { err: 'invalid_data', status: BAD_INPUT,
        clientErr: true, message: 'Wrong product ID or invalid quantity' };
    }
  }
  const insertionResp = await insertPurchase(productList);
  const [res] = await Promise.resolve(insertionResp);
  return res;
};

module.exports = {
  getOnePurchase,
  getPurchase,
  purchaseInsertion,
};
