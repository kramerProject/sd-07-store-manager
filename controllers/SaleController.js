const saleService = require('../services/SaleService');
const httpStatus = require('../config/httpStatus');

module.exports = {
  async create(request, response) {
    try {
      const sales = request.body;
      const result = await saleService.create(sales);
      if (result.status === 'failure') {
        return response.status(httpStatus.INVALID_DATA).json({ err: result.err });
      } else {
        return response.status(httpStatus.OK).json(result.data);
      }
    } catch (e) {
      console.log(e);
    }
  }
};
