const Model = require('../model');

const ZERO = 0;
const productsCollection = 'products';

const getNewQuantities = (method, products, itensSold) => {

  const newQuantities = itensSold.map(({ productId, quantity }) => {
    let newQuantity;
    const productStock = products.find(({ _id }) => productId === '' + _id);

    if(method === 'POST') newQuantity = productStock.quantity - quantity;

    if(method === 'DELETE') newQuantity = productStock.quantity + quantity;

    return { productId, quantity: newQuantity };
  }
  );

  return newQuantities;
};

const checkStockResponse = (method, products, itensSold) => {
  const newQuantities = getNewQuantities(method, products, itensSold);

  const itemsMissing = newQuantities.some(({ quantity }) => quantity < ZERO);

  if(itemsMissing) return {
    code: 'stock_problem',
    message: 'Such amount is not permitted to sell',
  };

  return { newQuantities };
};

const updateStock = async ({ newQuantities }) => {
  console.log(newQuantities);
  newQuantities.forEach(({ productId, quantity }) => {
    Model.update(productsCollection, productId, { quantity });
  });
};

module.exports = {
  checkStockResponse,
  updateStock,
};
