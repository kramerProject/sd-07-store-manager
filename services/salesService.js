const salesModel = require('../models/salesModel');

const checkQuantity = (element) => {
  const ZERO = 0;
  return typeof element.quantity === 'number' && element.quantity > ZERO;
};

const validate = (data) => {
  if (!data.every(checkQuantity)) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity',
      },
    };
  }

  return {};
};

const addSales = async (data) => {
  const validationsSold = validate(data);
  if (validationsSold.err) return validationsSold;

  const sold = await salesModel.addSales(data);
  return sold;
};

const getAllSales = async () => {
  const resultSales = await salesModel.getAllSales();
  return {
    sales: resultSales,
  };
};

const findByIdSales = async (id) => {
  const idSales = await salesModel.findByIdSales(id);
  console.log(idSales);
  if (idSales === '' || idSales === undefined || idSales === null) {
    return {
      err: {
        code: 'not_found',
        message: 'Sale not found',
      },
    };
  }
  return idSales;
};

const deleteSales = async (id) => {
  const salesDelete = await salesModel.findByIdSales(id);
  if (salesDelete === '' || salesDelete === undefined || salesDelete === null) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Wrong sale ID format',
      },
    };
  }
  await salesModel.deleteSales(id);
  return salesDelete;
};

module.exports = { addSales, getAllSales, findByIdSales, deleteSales };
