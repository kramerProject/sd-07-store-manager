const service = require('../services/productService');
const {paymentRequired} = require('../messagesCodes');

const errorAlreadyProduct = {
  name_length: {
    err: {
      code: 'invalid_data',
      message :'Product already exists'
    }
  }
};

const existProduct = async (nameProduct) => {
  const product = await service.existProduct(nameProduct);

  if (product) return { code: paymentRequired, message: errorAlreadyProduct};

  return false;
};

module.exports = {existProduct};
