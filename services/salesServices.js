const salesModel = require('../models/salesModel');
const productsModel = require('../models/productsModel');

const addWithValidation = async (sales) => {
  const zero = 0;
  for (let i = zero; i < sales.length; i += 1) {
    const product = sales[i];
    if (product.quantity < 1 || typeof(product.quantity) != 'number') {
      return {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity',
      };
    }

    const stock = await productsModel.getOne(product.productId);
    if (stock.quantity < product.quantity) {
      return {
        code: 'stock_problem',
        message: 'Such amount is not permitted to sell'
      };
    }
  }

  const itensSold = await salesModel.add(sales);
  return itensSold;
};

const getAllWithValidation = async () => {
  const sales = await salesModel.getAll();
  return sales;
};

const getOneSaleWithValidation = async (id) => {
  const sale = await salesModel.getOne(id);
  if (!sale) {
    return {
      code: 'not_found',
      message: 'Sale not found'
    };
  }
  return sale;
};

const updateOneWithValidation = async (id, itensSold) => {
  const zero = 0;
  const qtdMinima = 1;
  for (let i = zero; i < itensSold.length; i += 1) {
    const iten = itensSold[i];
    if (iten.quantity < qtdMinima || typeof(iten.quantity) != 'number') {
      return {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity'
      };
    }
  }
  const updatedSale = await salesModel.updateOne(id, itensSold);
  return updatedSale;
};

const excludeWithValidation = async (id) => {
  const sale = await salesModel.getOne(id);
  if (!sale) {
    return {
      code: 'invalid_data',
      message: 'Wrong sale ID format'
    };
  }
  const excludedSale = await salesModel.exclude(id);
  return excludedSale;
};

module.exports = {
  addWithValidation,
  getAllWithValidation,
  getOneSaleWithValidation,
  updateOneWithValidation,
  excludeWithValidation,
};
