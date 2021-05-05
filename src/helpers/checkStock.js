const productModel = require('../models/storeModel');

module.exports = async ({ productId, quantity: qtd }, type = 'up') => {
  let finalQty;
  const product = await productModel.getById(productId);
  const { name, quantity } = product[0];

  if (type === 'up') {
    const MIN_STOCK = 0;
    finalQty = quantity - qtd;
    if (finalQty < MIN_STOCK) return false;
  } else {
    finalQty = quantity + qtd;
  }

  await productModel.updateProduct(productId, { name, quantity: finalQty });
  return true;
};
