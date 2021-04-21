const CODES = require('../configurations/statusCodes');
const Models = require('../models');
const Validations = require('./validations');

const newObjectError = {
  status: CODES.UNPROCESSABLE_ENTITY,
  err: {
    code: 'invalid_data',
    message: 'Wrong id format',
  },
};

const createNewSales = async (arraySales) => {
  const { error } = await Validations.isSaleDataValid(arraySales);
  if (error) {
    throw { ...newObjectError, err: { ...newObjectError.err, message: error.message } };
  }
  const newSales = await Models.createNewSale(arraySales);
  return newSales.ops[0];
};

const getAllSales = async () => {
  return { sales: await Models.getAllSales() };
};

const getSaleById = async (id) => {
  const newObjectError2 = {
    status: CODES.NOTFOUND,
    err: {
      code: 'not_found',
      message: 'Sale not found',
    },
  };
  if (!Validations.isIdValid(id)) throw newObjectError2;
  const sale = await Models.getSaleById(id);
  if (!sale) throw newObjectError2;

  return sale;
};

const updateSaleById = async (id, arraySales) => {
  if (!Validations.isIdValid(id)) throw newObjectError;
  const { error } = Validations.isSaleDataValid(arraySales);
  if (error) {
    throw {
      ...newObjectError,
      err: { ...newObjectError.err, message: error.message }
    };
  }
  const sale = await Models.updateSaleById(id, arraySales);
  if (!sale) throw newObjectError;

  return sale;
};

const deleteSaleById = async (id) => {
  if (!Validations.isIdValid(id)) {
    throw {
      ...newObjectError,
      err: { ...newObjectError.err, message: 'Wrong sale ID format' }
    };
  }
  const sale = await Models.deleteSaleById(id);
  if (!sale) {
    throw {
      ...newObjectError,
      err: { ...newObjectError.err, message: 'Wrong sale ID format' }
    };
  }

  return sale;
};

module.exports = {
  createNewSales,
  getAllSales,
  getSaleById,
  updateSaleById,
  deleteSaleById,
};
