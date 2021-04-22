const salesModel = require('../model/salesModel');
const productsModel = require('../model/productsModel');
const { ObjectId } = require('mongodb');
const Joi = require('@hapi/joi');

const customError = require('../customErrors/customError');

const {
  UNPROCESSABLE_ENTITY,
  CREATED,
  OK,
  NOT_FOUND
} = require('../httpsStatus.json');

const INVALID_DATA_MESSAGE = 'Wrong product ID or invalid quantity';
const INVALID_DATA = 'invalid_data';

const validateQuantity = (quantity) => {
  const MIN_QTD_LENGTH = 1;
  const schema = Joi.object({
    quantity: Joi.number().min(MIN_QTD_LENGTH).required(),
  });

  const { error } = schema.validate({ quantity });
  if (error) {
    throw new customError(INVALID_DATA_MESSAGE, INVALID_DATA, UNPROCESSABLE_ENTITY);
  }
};

const validateId = (id) => {
  if (!ObjectId.isValid((id))) {
    throw new customError(INVALID_DATA_MESSAGE, INVALID_DATA, UNPROCESSABLE_ENTITY);
  }
};

const isProductCadastrate = async (id) => {
  const { getProductById } = productsModel;
  const product = await getProductById(id);
  if (!product) {
    throw new customError(INVALID_DATA_MESSAGE, INVALID_DATA, UNPROCESSABLE_ENTITY);
  }
};


const validateProducts = async (products) => {

  for (const product of products) {
    const { productId, quantity } = product;
    validateId(productId);
    validateQuantity(quantity);
    await isProductCadastrate(productId);
    await validateStock(productId, quantity);
  }

};

const validateSaleId = (id, type) => {
  if (!ObjectId.isValid((id))) {
    if (type === 'getById') {
      throw new customError('Sale not found', 'not_found', NOT_FOUND);
    } else {
      throw new customError('Wrong sale ID format', INVALID_DATA, UNPROCESSABLE_ENTITY);
    }
  }
};

const validateStock = async (id, quantity) => {
  const { getProductById } = productsModel;

  const product = await getProductById(id);

  if (product.quantity < quantity) {
    throw new customError(
      'Such amount is not permitted to sell', 
      'stock_problem', 
      NOT_FOUND
    );
  }
};

const addSale = async (products) => {
  const { addSale } = salesModel;
  await validateProducts(products);
  const sale = await addSale(products);
  return sale;
};

const getAllSales = async () => {
  const { getAllSales } = salesModel;
  const sales = await getAllSales();
  return ({
    sales: sales
  });
};

const getSaleById = async (id) => {
  validateSaleId(id, 'getById');

  const { getSaleById } = salesModel;
  const sale = await getSaleById(id);

  if (!sale) {
    throw new customError('Sale not found', 'not_found', NOT_FOUND);
  }

  return sale;
};

const updateSale = async (id, products) => {
  validateId(id);
  await validateProducts(products);

  const { updateSale } = salesModel;
  const updatedSale = await updateSale(id,products);
  return updatedSale;
};

const deleteSale = async (id) => {
  validateSaleId(id);

  const { deleteSale } = salesModel;
  const deletedSale = await deleteSale(id);
  return deletedSale;
};

module.exports = {
  addSale,
  getAllSales,
  getSaleById,
  updateSale,
  deleteSale
};