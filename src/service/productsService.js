const { get } = require('frisby');
const { httpStatusCode } = require('../../constants');
const { creatProduct, getAllProducts } = require('../models/productsModel');
const { nameValidator, quatityValidation } = require('../validations/products');

const creatProductService = async (name, quantity) => {
  const PRODUC_DONT_EXISTS = 0;
  nameValidator(name);
  quatityValidation(quantity);
  let registredProduct = await getAllProducts();
  registredProduct = registredProduct.filter((product) => product.name === name);
  if (registredProduct.length > PRODUC_DONT_EXISTS) {
    throw new Error('Product already exists');
  }
  const newProduct = await creatProduct(name, quantity);
  return newProduct;
};

const getAllProductService = () => {
  return getAllProducts();
};

module.exports = {
  creatProductService,
  getAllProductService,
};
