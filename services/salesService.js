const ProductModel = require('../models/ProductModel');
const salesModel = require('../models/salesModel');
const func = require('../util');
// const validName = require('../middlewares/validName');
const status = require('./status');

const getAll = async () => {
  const result = await salesModel.getAllSales();
  const formatedResult = { products: [...result] };
  // console.log(formatedResult);
  return formatedResult;
};

const create = async (products) => {
  const productsList = [ ...products];
  //console.log(productsList);
  const filteredIds = productsList.filter((e) => e.productId );

  // const isValidProducts = await func.validProductList(productsList);


  // console.log(isValidProducts);
  const result = await salesModel.createSale(productsList);
  return result;
};

module.exports = {
  getAll,
  create,
};
