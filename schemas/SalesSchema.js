const SalesModel = require('../models/salesModel');

//validação feita om ajuda dos videos do conteudo da aulda do dia 27.2

const errors = {
  lowerThanZero: {
    code: 'invalid_data',
    message: 'Wrong product ID or invalid quantity'
  },
  notANumber: {
    code: 'invalid_data',
    message: 'Wrong product ID or invalid quantity'
  },
  saleNotFound: {
    code: 'not_found',
    message: 'Sale not found'
  },
};

const isNotAnumber = (value) => (typeof value !== 'number');
const lowerThenZ = (value, min) => (value <= min);
const unprocess = 422;
const notFound = 404;

const validatePost = async (itensSold) => {

  const{ quantity } = itensSold[0];
  const zero = 0;

  if (lowerThenZ(quantity, zero)) return { code: unprocess, err: errors.lowerThanZero };
  if (isNotAnumber(quantity)) return { code: unprocess, err: errors.notANumber };

  return {};
};

const validatePut = async (id) => {

  const salesId = await SalesModel.getById(id);

  if (!salesId) return { code: notFound, err: errors.saleNotFound };

  return {};
};

module.exports = {
  validatePost,
  validatePut
};