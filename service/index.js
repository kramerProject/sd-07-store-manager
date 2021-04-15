const { ObjectId } = require('mongodb');

const ZERO = 0;

const getNewQuantities = (products, itensSold) => {

  const newQuantities = itensSold.map(({ productId, quantity }) => {
    const productStock = products.find(({ _id }) => productId === '' + _id);

    const newQuantity = productStock.quantity - quantity;
    return { productId, quantity: newQuantity };
  }
  );

  return newQuantities;
};

const checkStockResponse = (products, itensSold) => {
  const newQuantities = getNewQuantities(products, itensSold);

  const itemsMissing = newQuantities.some(({ quantity }) => quantity < ZERO);

  if(itemsMissing) return {
    code: 'stock_problem',
    message: 'Such amount is not permitted to sell',
  };

  return { ok: true };
};


module.exports = {
  checkStockResponse,
};