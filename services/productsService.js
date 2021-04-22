const productsModel = require('../models/productsModel');
const validation = require('./productsValidation');

const OK = 200;
const CREATED = 201;
const FIVE = 5;

const insertProduct = async (name, quantity) => {
  const productValidation = await validation.productValidation(name);
  const nameValidation = validation.charactersValidation(name, FIVE);
  const quantityValidation = validation.numberValidation(quantity);
  
  if (productValidation.response) return productValidation;
  if (nameValidation.response) return nameValidation;
  if (quantityValidation.response) return quantityValidation;
  const result = await productsModel.insertProduct(name, quantity);
  return {
    code: CREATED,
    response: result,
  };
};

const findProductById = async (id) => {
  const idValid = await validation.idValidation(id);
  if (idValid.response) return idValid;
  const result = await productsModel.findProductById(id);
  return {
    code: OK,
    response: result,
  };
};

const updateProductById = async (id, name, quantity) => {
  const nameValidation = validation.charactersValidation(name, FIVE);
  const quantityValidation = validation.numberValidation(quantity);

  if (nameValidation.response) return nameValidation;
  if (quantityValidation.response) return quantityValidation;

  const result = await productsModel.updateProductById(id, name, quantity);
  return {
    code: OK,
    response: result
  };
};

const deleteProduct = async (id) => {
  const idValid = await validation.idValidation(id);
  if (idValid.response) return idValid;

  const result = await productsModel.deleteProduct(id);
  return {
    code: OK,
    response: result
  };
};

module.exports = {
  insertProduct,
  findProductById,
  updateProductById,
  deleteProduct,
};
