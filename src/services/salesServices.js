const salesModel = require('../models/salesModel');
const productsModel = require('../models/productsModel');
const { ZERO, CODE_ERROR } = require('../valuesGlobal');

const checkedProducts = async (itensSold) => {
  console.log('checkedProducts', itensSold);
  const productSolds = await Promise.all(
    itensSold.map( async ({ productId, quantity }) => {
      const product = await productsModel.getById(productId);

      if (product === null) return null;
      return { productId, quantity};
    }));

  return productSolds
    .every((item) => {
      return item !== null && (item.quantity > ZERO && typeof item.quantity !== 'string');
    });

};


const addSale = async (itensSold) => {
  const isValid = await checkedProducts(itensSold);
  console.log('isValid: ', isValid);
  if (!isValid) return {
    message: 'Wrong product ID or invalid quantity',
    cod_err: true };

  return await salesModel.add(itensSold);
};

const updateSale = async (id, itensSold) => {
  const isValid = await checkedProducts(itensSold);

  if (!isValid) return {
    message: 'Wrong product ID or invalid quantity',
    cod_err: true };

  return await salesModel.update(id, itensSold);
};


module.exports = {
  addSale,
  updateSale,
};
