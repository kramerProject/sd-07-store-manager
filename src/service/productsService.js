const { get } = require('frisby');
const { creatProduct, getAllProducts } = require('../models/productsModel');
const { nameValidator, quatityValidation } = require('../validations/products');

const creatProductService = async (name, quantity) => {
  try {
    nameValidator(name);
    quatityValidation(quantity);
    return await creatProduct(name, quantity);
  } catch (error) {
    console.log(error.message);
  }
};

const getAllProductService = () => {
  return getAllProducts();
};

module.exports = {
  creatProductService,
  getAllProductService,
};
