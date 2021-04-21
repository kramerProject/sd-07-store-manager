const {findByProductId} = require('../schemas/idProductSchema');

const existProduct = async (request, response, next) => {
  const { id } = request.params;

  const result = await findByProductId(id);

  if (result.message) {
    const { code, message } = result;
    return response.status(code).json(message);
  }
  next();
};

module.exports =  existProduct;
