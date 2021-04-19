const service = require('../services/productService');

const {unprocessableEntity} = require('../messagesCodes');

const errorsId = {
  err: {
    code: 'invalid_data',
    message :'Wrong id format'
  },
};


const findByProductId = async (id) => {
  const product = await service.findByProductId(id);

  if (!product) return { code: unprocessableEntity, message: errorsId};

  return product;
};


module.exports = {
  findByProductId,
};
