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
  async findAll(request, response) {
    try {
      const products = await productService.getAll();
      return response.status(httpStatus.OK).json({ products });
    } catch (e) {
      console.log(e);
    }
  },
  async findById(request, response){
    try {
      const { id } = request.params;
      const product = await productService.getById(id);
      return response.status(httpStatus.OK).json(product);
    } catch (e) {
      console.log(e);
    }
  },
  async update(request, response) {
    try {
      const { id } = request.params;
      const data = request.body;
      const product = await productService.update(id, data);
      return response.status(httpStatus.OK).json(product);
    } catch (e) {
      console.log(e);
    }
  },
};
