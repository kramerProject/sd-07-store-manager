const purchaseInsertion = require('../../models');

const BAD_INPUT = 'Unprocessable Entity';

const insertPurchase = async (productList) => {
  const purchaseInsertionRes = await purchaseInsertion(productList);
  return purchaseInsertionRes
    ? purchaseInsertionRes
    : { err: 'invalid_data', status: BAD_INPUT,
      clientErr: true, message: 'Wrong id format' };
};

module.exports = { insertPurchase };
