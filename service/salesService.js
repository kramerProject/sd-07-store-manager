const salesModel = require('../models/salesModel');
const status = require('../config/status');
const productsModel = require('../models/productsModel');

const ZERO = 0;
const validateProductSales = async (productId, quantity) => {
  const resultProductId = await productsModel.findByIdProductsModel(productId);
  if (!resultProductId || typeof quantity !== 'number' || quantity <= ZERO) {
    return false;
  }
  return true;
};

const addSalesService = async (products) => {
  const productsEvery = products.map(async(product) => {
    const validate = await validateProductSales(product.productId, product.quantity);
    console.log('validadte', validate);
    return validate;
  });
  console.log('productsEvery', productsEvery);
  if (!productsEvery) {
    return {
      err: {
        code: 'invalid_data',
        status: status.UNPROCESSABLE_ENTITY,
        message: 'Wrong product ID or invalid quantity',
      },
    };
  }
  const salesProducts = await salesModel.addSalesModel(products);
  return salesProducts;
};

const getAllSalesService = async () => {
  const getAllSales = await salesModel.findAllSalesModel();
  return {
    sales: getAllSales,
  };
};

const getByIdSalesService = async (id) => {
  const getByIdSale = await salesModel.findByIdSalesModel(id);
  if (!getByIdSale) {
    return {
      code: 'not_found',
      status: status.NOT_FOUND,
      message: 'Sale not found',
    };
  }
  return getByIdSale;
};

module.exports = {
  addSalesService,
  getAllSalesService,
  getByIdSalesService
};
