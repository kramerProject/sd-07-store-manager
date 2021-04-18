const { authPdtAmount } = require('./validateInputs');
const { getOnePdt, insertPurchase } = require('../models');

const BAD_INPUT = 'Unprocessable Entity';

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

module.exports = purchaseInsertion;
