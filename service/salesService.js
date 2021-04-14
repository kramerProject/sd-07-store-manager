const salesModel = require('../model/salesModel');
const productsModel = require('../model/productsModel');
const { ObjectId } = require('mongodb');
const Joi = require('@hapi/joi');

const INVALID_DATA = 'Wrong product ID or invalid quantity';

const validateQuantity = (quantity) => {
  const MIN_QTD_LENGTH = 1;
  const schema = Joi.object({
    quantity: Joi.number().min(MIN_QTD_LENGTH).required(),
  });

  const { error } = schema.validate({ quantity });
  if (error) {
    // const { details: [{ message }] } = error;
    throw new Error(INVALID_DATA);
  }
};

const validateId = (id) => {
  if (!ObjectId.isValid((id))) {
    throw new Error(INVALID_DATA);
  }
};

const isProductCadastrate = async (id) => {
  const { getProductById } = productsModel;
  const product = await getProductById(id);
  console.log('passou');
  if (!product) {
    throw new Error(INVALID_DATA);
  }
};

const validateProducts = (products) => {
  products.forEach(({ productId, quantity }) => {
    validateId(productId);
    validateQuantity(quantity);
    isProductCadastrate(productId);
  });

};

const validateSaleId = (id, type) => {
  if (!ObjectId.isValid((id))) {
    if (type === 'getById') {
      throw new Error('Sale not found');
    } else {
      throw new Error('Wrong sale ID format');
    }
  }
};

const addSale = async (products) => {
  const { addSale } = salesModel;
  validateProducts(products);

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
    throw new Error('Sale not found');
  }

  return sale;
};

const updateSale = async (id, products) => {
  validateId(id);
  validateProducts(products);

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