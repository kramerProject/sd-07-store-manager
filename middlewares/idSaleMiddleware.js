const {findBySaleId} = require('../schemas/idSaleSchema');

const existSale = async (request, response, next) => {
  const { id } = request.params;
  const method = request.method;

  const result = await findBySaleId(id, method);

  if (result.message) {
    const { code, message } = result;
    return response.status(code).json(message);
  }
  next();
};

module.exports =  existSale;
