const productService = require('../services/ProductService');

const httpStatus = require('../config/httpStatus');

module.exports = {
  async create(request, response) {
    try {
      const data = request.body;
      const result = await productService.create(data);
      if (result.status === 'failure') {
        return response.status(httpStatus.INVALID_DATA).json({ err: result.err });
      } else {
        return response.status(httpStatus.CREATED).json(result.data);
      }
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
      const result = await productService.getById(id);
      if (result.status === 'failure') {
        return response.status(httpStatus.INVALID_DATA).json({ err: result.err });
      } else {
        return response.status(httpStatus.OK).json(result.data);
      }

    } catch (e) {
      console.log(e);
    }
  },
  async update(request, response) {
    try {
      const { id } = request.params;
      const data = request.body;
      const result = await productService.update(id, data);
      if (result.status === 'failure') {
        return response.status(httpStatus.INVALID_DATA).json({ err: result.err });
      } else {
        return response.status(httpStatus.OK).json(result.data);
      }
    } catch (e) {
      console.log(e);
    }
  },
  async delete(request, response) {
    try {
      const { id } = request.params;
      const result = await productService.delete(id);
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
