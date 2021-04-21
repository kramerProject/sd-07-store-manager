const service = require('../services/productService');
const {unprocessableEntity} = require('../messages/messageCodes');
const {invalidData, alreadyExists} = require('../messages/');
const {objectError} = require('../helpers');

const existProduct = async (nameProduct) => {
  const product = await service.searchProduct(nameProduct);

  if (product) return {
    code: unprocessableEntity,
    message: objectError(invalidData, alreadyExists)
  };

  return false;
};

module.exports = {existProduct};
