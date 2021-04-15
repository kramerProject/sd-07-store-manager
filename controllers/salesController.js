const salesModel = require('../models/salesModel');

const REQUEST_CREATED = 201;
const REQUEST_OK = 200;
const INTERNAL_SERVER_ERROR = 500;
const UNPROCESSABLE_ENTITY = 422;

const addSale = async (request, response) => {
  try {
    const sale = request.body;
    const results = await salesModel.addNewSale(sale);
    response.status(REQUEST_OK).json(results);
  } catch (error) {
    console.log(error);
    response.status(INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

const findAll = async (_request, response) => {
  try {
    const results = await salesModel.findAllSales();
    response.status(REQUEST_OK).json({ sales: results });
  } catch (error) {
    console.log(error);
    response.status(INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

const findById = async (request, response) => {
  console.log('findById');
  try {
    const { id } = request.params;
    const results = await salesModel.findSaleById(id);
    response.status(REQUEST_OK).json(results);
  } catch (error) {
    console.log(error);
    response.status(UNPROCESSABLE_ENTITY).json({
      err: {
        code: 'invalid_data',
        message: 'Sale not found',
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
