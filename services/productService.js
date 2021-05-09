const productsModel = require('../models/productsModel');
const validation = require('./productsValidate');

const OK = 200;
const CREATED = 201;
const FIVE = 5;

const insertProduct = async (name, quantity) => {
  const productValidation = await validation.productValidation(name);
  const nameValidation = await validation.characterValidation(name, FIVE);
  const quantityValidation = await validation.numberValidation(quantity);

  if (productValidation.response) return productValidation;
  if (nameValidation.response) return nameValidation;
  if (quantityValidation.response) return quantityValidation;
  const result = await productsModel.insertProduct(name, quantity);
  return {
    code: CREATED,
    response: result,
  };
};

module.exports = {
  insertProduct,
};
