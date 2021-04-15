const saleModel = require('../models/saleModel');
const { verifyProductsId, verifyQuantity } = require('../validations/saleValidations');
const rescue = require('express-rescue');
const { ObjectId } = require('mongodb');

const OK = 200;
const CREATED = 201;
const NOT_FOUND = 404;
const INVALID_DATA = 422;
const wrongIdOrQuantity = {
  'err': {
    'code': 'invalid_data',
    'message': 'Wrong product ID or invalid quantity'
  }
};
const wrongIdFormat = {
  'err': {
    'code': 'invalid_data',
    'message': 'Wrong sale ID format'
  }
};

const notFoundError = {
  'err': {
    'code': 'not_found',
    'message': 'Sale not found'
  }
};

// const INVALID_DATA = 422;
// const invalidIdError = {
//   'err': {
//     'code': 'invalid_data',
//     'message': 'Wrong id format'
//   }
// };


const getAllsales = rescue(async (_req, res) => {
  try {
    const salesArray = await saleModel.getAllSales();
    res.status(OK).json({
      'sales': salesArray
    });
  } catch (error) {
    throw new Error(error);
  }
});

const getsaleById = rescue(async (req, res) => {
  try {
    const { id } = req.params;
    const sale = await saleModel.getSaleById(id);
    if (sale === null || !ObjectId.isValid(id)) {
      return res.status(NOT_FOUND).json(notFoundError);
    }
    res.status(OK).json(sale);
  } catch (error) {
    throw new Error(error);
  }
});

const addNewsale = rescue(async (req, res) => {
  try {
    if(await verifyProductsId(req.body)) {
      return res.status(INVALID_DATA).json(wrongIdOrQuantity);
    };
    if(verifyQuantity(req.body)) {
      return res.status(INVALID_DATA).json(wrongIdOrQuantity);
    };
    const sale = await saleModel.addNewSale(req.body);
    res.status(OK).json(sale);
  } catch (error) {
    throw new Error(error);
  }
});

const updateSale = rescue(async (req, res) => {
  try {
    const { id } = req.params;
    if(await verifyProductsId(req.body)) {
      return res.status(INVALID_DATA).json(wrongIdOrQuantity);
    };
    if(verifyQuantity(req.body)) {
      return res.status(INVALID_DATA).json(wrongIdOrQuantity);
    };
    const product = await saleModel.updateSale(id, req.body);
    res.status(OK).json(product);
  } catch (error) {
    throw new Error(error);
  }
});

const deleteSale = rescue(async (req, res) => {
  try {
    const { id } = req.params;
    const sale = await saleModel.getSaleById(id);
    if (sale === null || !ObjectId.isValid(id)) {
      return res.status(INVALID_DATA).json(wrongIdFormat);
    }
    await saleModel.deleteSale(id);
    res.status(OK).json({});
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  getAllsales,
  getsaleById,
  addNewsale,
  updateSale,
  deleteSale,
};
