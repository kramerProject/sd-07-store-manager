const saleModel = require('../models/sales');

const productModel = require('../models/products');

const ERR_MESSAGE = 'Wrong product ID or invalid quantity';

const validationQuantity = (quantity) => {
  const ZERO = 0;
  if (typeof quantity !== 'number' || quantity < ZERO || quantity === ZERO) {
    throw new Error(ERR_MESSAGE);
  }
};

const validateProductId = (productId) => {
  const product = productModel.getById(productId);
  if (!product) throw new Error(ERR_MESSAGE);
};

const validateSaleId = async (saleId) => {
  const sale = await saleModel.getById(saleId);
  if (!sale) throw new Error(ERR_MESSAGE);

  return sale;
};

const validateStock = async (productId, quantity) => {
  const stock = await productModel.getById(productId);
  const ZERO = 0;
  const ERR_MESSAGE = 'Such amount is not permitted to sell';
  if (stock.quantity < ZERO || stock.quantity < quantity) {
    throw new Error(ERR_MESSAGE);
  }
};

const createSale = async (sales) => {
  for await (let sl of sales) {
    const { productId, quantity } = sl;
    validationQuantity(quantity);
    validateProductId(productId);
    await validateStock(productId, quantity);
  }
  return await saleModel.postdata(sales);
};
 
const getAllSales = async () => {
  const allProducts = await saleModel.getAll();

  return allProducts;
};
 
const getSaleId = async (id) => {
  const sale = await saleModel.getById(id);
  if(!sale) {
    const ERROR_MESSAGE = 'Sale not found';
    throw new Error(ERROR_MESSAGE);
  }
  return sale;
};
 
const updateSale = async (id, sale) => {
  sale.forEach((sl) => {
    const { productId, quantity } = sl;
    validationQuantity(quantity);
    validateProductId(productId);
    validateSaleId(id);
  });

  const result = await saleModel.editdata(id, sale);
  return result;
};

const deleteSale = async (id) => {
  const result = await validateSaleId(id);
  if (!result) {
    const ERROR_MESSAGE = 'Wrong sale ID format';
    throw new Error(ERROR_MESSAGE);
  }
  return await saleModel.deletedata(result);
};

module.exports = {
  createSale,
  getAllSales,
  getSaleId,
  updateSale,
  deleteSale
};
