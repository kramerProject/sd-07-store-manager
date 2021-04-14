const { request } = require('express');
const productModel = require('../models/produtoModel');

const CODE = 'invalid_data';
const status = {
  OK: 200,
  CREATE: 201,
  UNPROCESSABLE: 422,
  INTERNAL_SERVER_ERROR: 500
};
const getAll = async (_request, response) => {
  try {
    const result = await productModel.getAll();
    response.status(status.OK).json({products: result});
  } catch (error) {
    console.error(error);
    response.status(status.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

const getById = async (request, response) => {
  try {
    const { id } = request.params;
    const result = await productModel.getById(id);

    if (!result) {
      return response.status(status.UNPROCESSABLE)
        .json({err:{code: CODE, message: 'Wrong id format' }});
    }
    response.status(status.OK).json(result);
  } catch (error) {
    console.error(error);
    response.status(status.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

const createProduct = async (request, response) => {
  try {
    const { name, quantity } = request.body;
    const result = await productModel.createProduct(name, quantity);

    response.status(status.CREATE).json(result);
  } catch (error) {
    console.error(error);
    response.status(status.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

const update = async (request, response) => {
  try {
    const {name, quantity} = request.body;
    const { id } = request.params;
    const result = await productModel.update(id, name, quantity);

    if (!result) {
      return response.status(status.UNPROCESSABLE)
        .json({err:{code: CODE, message: 'Wrong id format' }});
    }
    response.status(status.OK).json(result);
  } catch (error) {
    console.error(error);
    response.status(status.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

const deleteById = async (request, response) => {
  try {
    const { id } = request.params;
    const result = await productModel.deleteById(id);
    if (!result) {
      return response.status(status.UNPROCESSABLE)
        .json({err:{code: CODE, message: 'Wrong id format' }});
    }
    response.status(status.OK).json(result);
  } catch (error) {
    console.error(error);
    response.status(status.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
}

module.exports = {
  createProduct,
  getAll,
  getById,
  update,
  deleteById,
};