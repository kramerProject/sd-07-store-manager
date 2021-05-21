const productsModel = require('../models/productsModel');
const salesModel = require('../models/salesModel');

const validateQuantity = (sales) => {
  let message;
  const one = 1;

  if(typeof sales[0].quantity !== 'number' || sales[0].quantity < one) {
    message = 'Wrong product ID or invalid quantity';
  }
  return message;
};

const updateAdd = async (sales) => {
  let message;
  const zero = 0;
  const product = await productsModel.getById(sales[0].productId);
  product.quantity -= sales[0].quantity;
  if (product.quantity < zero ){
    message = 'Such amount is not permitted to sell';
  }
  const productUpdated = await productsModel.update(
    product.name, product.quantity, product._id,
  );
  if (!productUpdated) {
    message = 'Such amount is not permitted to sell';
  }
  return message;
};

const updateRemove = async (id) => {
  const sale = await salesModel.getById(id);
  console.log(sale);
  if (sale._id) {
    console.log(sale.itensSold[0].productId);
    const product =  await productsModel.getById(sale.itensSold[0].productId);
    console.log(product);
    product.quantity += sale.itensSold[0].quantity;
    await productsModel.update(
      product.name, product.quantity, product._id
    );
  }
};


module.exports = {
  validateQuantity,
  updateAdd,
  updateRemove,
};
