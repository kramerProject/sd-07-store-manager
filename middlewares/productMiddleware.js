const {validate} = require('../schemas/validateManagerProductSchema');

const validateProduct = async (request, response, next) => {

  const { name, quantity } = request.body;

  const result = await validate(name, quantity);

  if (result) {
    const { code, message } = result;
    return response.status(code).json(message);
  }

  next();
};

module.exports = validateProduct;
