const productModel = require('../models/productsModel');

const addWithValidation = async (name, quantity) => {
  const regraQtdCaractere = 5;
  const qtdMinima = 1;
  if (name.length <= regraQtdCaractere) {
    return {
      code: 'invalid_data',
      message: 'name length must be at least 5 characters long',
    };
  }

  if (quantity < qtdMinima) {
    return {
      code: 'invalid_data',
      message: 'quantity length must be larger than or equal to 1',
    };
  }

  if (typeof(quantity) != 'number') {
    return {
      code: 'invalid_data',
      message: 'quantity must be a number',
    };
  }

  const newProduct = await productModel.add(name, quantity);
  return newProduct;
};

module.exports = {
  addWithValidation,
};
