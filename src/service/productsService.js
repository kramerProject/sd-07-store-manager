const { creatProduct } = require('../models/productsModel');
const { nameValidator, quatityValidation } = require('../validations/products');

const creatProductService = async (name, quantity) => {
  if (nameValidator(name) && quatityValidation(quantity)) {
    const createdProduct = await creatProduct(name, quantity);
    return createdProduct;
  }
  return false;
};

module.exports = {
  creatProductService,
};
