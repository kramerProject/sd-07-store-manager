const salesModel = require('../models/productsModel');

const REQUEST_CREATED = 201;
const REQUEST_OK = 200;
const INTERNAL_SERVER_ERROR = 500;
const UNPROCESSABLE_ENTITY = 422;

const addSale = async (request, response) => {
  try {
    const { name, quantity } = request.body;
    const results = await productsModel.addNewProduct(name, quantity);
    response.status(REQUEST_CREATED).json(results);
  } catch (error) {
    console.log(error);
    response.status(INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

const findAll = async (_request, response) => {
  console.log('findAll');
  try {
    const results = await productsModel.findAllProducts();
    console.log('findAllResults', results);
    response.status(REQUEST_OK).json(results);
  } catch (error) {
    console.log(error);
    response.status(INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

const findById = async (request, response) => {
  console.log('findById');
  try {
    const { id } = request.params;
    const results = await productsModel.findProductById(id);
    console.log('findByIdResults', results);
    response.status(REQUEST_OK).json(results);
  } catch (error) {
    console.log(error);
    response.status(UNPROCESSABLE_ENTITY).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong id format',
      }
    });
  }
};

const updateOne = async (request, response) => {
  console.log('updateOne');
  try {
    const { id } = request.params;
    const { name, quantity } = request.body;
    const results = await productsModel.updateProduct(id, name, quantity);
    console.log('updateOneResults', results);
    response.status(REQUEST_OK).json(results);
  } catch (error) {
    console.log(error);
    response.status(UNPROCESSABLE_ENTITY).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong id format',
      }
    });
  }
};

const deleteOne = async (request, response) => {
  console.log('deleteOne');
  try {
    const { id } = request.params;
    const results = await productsModel.deleteProduct(id);
    console.log('deleteOneResults', results);
    response.status(REQUEST_OK).json(results);
  } catch (error) {
    console.log(error);
    response.status(UNPROCESSABLE_ENTITY).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong id format',
      }
    });
  }
};

module.exports = {
  addSale,
  findAll,
  findById,
  updateOne,
  deleteOne,
};
