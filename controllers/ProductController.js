const productService = require('../services/ProductService');

const httpStatus = require('../config/httpStatus');

module.exports = {
  async create(request, response) {
    try {
      const data = request.body;

      const product = await productService.create(data);

      return response.status(httpStatus.CREATED).json(product);
    } catch (e) {
      console.log(e);
    }
  },
};
