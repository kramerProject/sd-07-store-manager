const productModel = require('../models/productsModel');

const addWithValidation = async (name, quantity) => {
  const regraQtdCaractere = 5;
  if (name.length <= regraQtdCaractere) {
    return {
      code: 'invalid_data',
      message: 'name length must be at least 5 characters long',
    };
  }
  const newProduct = await productModel.add(name, quantity);
  return newProduct;
};

module.exports = {
  addWithValidation,
};
