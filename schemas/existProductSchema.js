const service = require('../services/productService');
const {unprocessableEntity} = require('../messagesCodes');

const errorAlreadyProduct = {
  err: {
    code: 'invalid_data',
    message :'Product already exists'
  }
};

const existProduct = async (nameProduct) => {

  const product = await service.searchProduct(nameProduct);

  if (product) return { code: unprocessableEntity, message: errorAlreadyProduct};

  return false;
};

module.exports = {existProduct};
