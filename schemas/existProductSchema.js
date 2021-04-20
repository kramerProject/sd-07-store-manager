const service = require('../services/productService');
const {unprocessableEntity} = require('../messages/messageCodes');
const {alreadyExists} = require('../messages/');
const {objectError} = require('../helpers');

const existProduct = async (nameProduct) => {
  const product = await service.searchProduct(nameProduct);

  if (product) return {
    code: unprocessableEntity,
    message: objectError(alreadyExists)
  };

  return false;
};

module.exports = {existProduct};
