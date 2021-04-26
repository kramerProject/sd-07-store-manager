const { ObjectID } = require('mongodb');
const { add, getAll, getById, update, exclude } = require('../models/salesModel');
const { updateBySales } = require('./productService');
const { CustomError } = require('../middlewares');
const {StatusCodes} = require('http-status-codes');

const ZERO_QTD = 0;
const code = 'invalid_data';

const addSales =  async (productList) => {
  productList.forEach((product) => {
    if (!ObjectID.isValid(product.productId))
      throw new CustomError(
        StatusCodes.UNPROCESSABLE_ENTITY,
        code,
        'Wrong product ID or invalid quantity');
    if (product.quantity <= ZERO_QTD || typeof product.quantity !== 'number')
      throw new CustomError(
        StatusCodes.UNPROCESSABLE_ENTITY,
        code,
        'Wrong product ID or invalid quantity');
  });
  const newSale = await add(productList);
  if (!newSale.result.ok) throw new CustomError(
    StatusCodes.UNPROCESSABLE_ENTITY,
    code,
    'Error from model - create');
  await updateBySales(productList, 'subtract');

  return { _id: newSale.insertedId, itensSold: productList };
};

const getAllSales = async () => {
  const data = await getAll();
  if (!data) throw new CustomError(
    StatusCodes.UNPROCESSABLE_ENTITY,
    code,
    'Error from model - getAll');
  return data;
};

const readSalesById = async (id) => {
  const sale = await getById(id);
  if (!sale) throw new CustomError(
    StatusCodes.NOT_FOUND,
    'not_found',
    'Sale not found');
  if (!ObjectID.isValid(id)) throw new CustomError(
    StatusCodes.UNPROCESSABLE_ENTITY,
    code,
    'Wrong id format');
  return sale;
};

const updateSaleById = async (id, body) => {
  const { productId, quantity } = body[0];
  if (!ObjectID.isValid(id)) throw new CustomError(
    StatusCodes.UNPROCESSABLE_ENTITY,
    code,
    'Wrong product ID or invalid quantity');

  if (quantity <= ZERO_QTD || typeof quantity !== 'number')
    throw new CustomError(
      StatusCodes.UNPROCESSABLE_ENTITY,
      code,
      'Wrong product ID or invalid quantity');

  const newSale = await update(id, productId, quantity);
  if (!newSale.result.ok) throw new CustomError(
    StatusCodes.UNPROCESSABLE_ENTITY,
    code,
    'Error from model - updateSaleById');
  return { _id: id, itensSold: body };
};

const deleteSaleById = async (id) => {
  if (!ObjectID.isValid(id)) throw new CustomError(
    StatusCodes.UNPROCESSABLE_ENTITY,
    code,
    'Wrong sale ID format');
  const readSale = await readSalesById(id);
  const saleDeleted = await exclude(id);
  if (!saleDeleted.result.ok) throw new CustomError(
    StatusCodes.UNPROCESSABLE_ENTITY,
    code,
    'Error from model - deleteSale'
  );
  await updateBySales(readSale.itensSold, 'add');
  return readSale;
};

module.exports = {
  addSales,
  getAllSales,
  readSalesById,
  updateSaleById,
  deleteSaleById,
};
