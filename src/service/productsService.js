const { get } = require('frisby');
const { creatProduct, getAllProducts } = require('../models/productsModel');
const { nameValidator, quatityValidation } = require('../validations/products');

const creatProductService = async (name, quantity) => {
  const PRODUC_DONT_EXISTS = 0;
  try {
    nameValidator(name);
    quatityValidation(quantity);
    let registredProduct = await getAllProducts();
    registredProduct = registredProduct.filter(product => product.name === name);
    if (registredProduct.length !== PRODUC_DONT_EXISTS) {
      throw new Error('Product already exists');
    }
  } catch (error) {
    console.log(error.message);
  }
  return await creatProduct(name, quantity);
};

const getAllProductService = () => {
  return getAllProducts();
};

module.exports = {
  creatProductService,
  getAllProductService,
};
