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
  },
  async getAll(request, response) {
    try {
      const sales = await saleService.getAll();
      return response.status(httpStatus.OK).json({ sales });
    } catch (e) {
      console.log(e);
    }
  },
  async getById(request, response) {
    try {
      const { id } = request.params;
      const result = await saleService.findById(id);
      if (result.status === 'failure') {
        return response.status(httpStatus.NOT_FOUND).json({ err: result.err });
      } else {
        return response.status(httpStatus.OK).json(result.data);
      }
    } catch (e) {
      console.log(e);
    }
  }
};
