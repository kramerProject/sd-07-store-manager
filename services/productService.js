const modelProduct = require('../models/productsModel');
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
  const result = await modelProduct.insertProduct(name, quantity);
  return {
    code: CREATED,
    response: result,
  };
};

const findProductById = async (id) => {
  const validId = await validation.idValidation(id);
  if (validId.response) return validId;
  const result = await modelProduct.findId(id);
  return {
    code: OK,
    response: result,
  };
};

const updateProductById = async (id, name, quantity) => {
  const nameValidation = validation.characterValidation(name, FIVE);
  const quantityValidation = validation.numberValidation(quantity);

  if (nameValidation.response) return nameValidation;
  if (quantityValidation.response) return quantityValidation;

  const result = await modelProduct.updateProduct(id, name, quantity);
  return {
    code: OK,
    response: result
  };
};


module.exports = {
  insertProduct,
  findProductById,
  updateProductById,
};
