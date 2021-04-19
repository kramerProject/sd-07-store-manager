const { ObjectId } = require('bson');
const service = require('../services/productService');

const {unprocessableEntity} = require('../messagesCodes');

const errorsId = {
  err: {
    code: 'invalid_data',
    message :'Wrong id format'
  },
};

const findByProductId = async (id) => {

  if (!ObjectId.isValid(id)) return {
    code: unprocessableEntity,
    message: errorsId
  };

  const product = await service.findByProductId(id);
  console.log('product', product);

  if (!product) return { code: unprocessableEntity, message: errorsId};

  return product;
};


module.exports = {
  findByProductId,
};
