const {validateQuantity} = require('../schemas/quantitySaleSchema');

const validateSale = (request, response, next) => {

  const sales = request.body;

  for ( sale of sales) {
    const { quantity } = sale;
    const result = validateQuantity(quantity);
    if (result) {
      const { code, message } = result;
      return response.status(code).json(message);
      break;
    }
  }

  next();
};

module.exports = validateSale;
