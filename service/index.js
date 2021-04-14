const Model = require('../model');

const salesCollection = 'sales';

const isSaleValid = async (itensSold) => {
  let result = true;

  for(const item of itensSold) {
    const productInStock = await Model.findById(salesCollection, item.productId);

    console.log('em estoque:', productInStock, 'item: ', item);

    if(item.quantity > productInStock.quantity) {
      result = false;
    }
  };

  return result;
};
module.exports = {
  isSaleValid,
};