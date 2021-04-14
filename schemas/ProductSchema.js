const ProductModel = require('../models/productsModel');
//validação feita om ajuda dos videos do conteudo da aulda do dia 27.2

const errors = {
  lowerThenFive: {
    code: 'invalid_data',
    message: '"name" length must be at least 5 characters long'
  },
  alreadyExists: {
    code: 'invalid_data',
    message: 'Product already exists'
  },
  lowerThanZero: {
    code: 'invalid_data',
    message: '"quantity" must be larger than or equal to 1'
  },
  notANumber: {
    code: 'invalid_data',
    message: '"quantity" must be a number'
  }
};

const isNotAnumber = (value) => (typeof value !== 'number');
const lowerThen = (value, min) => (value.length < min);
const lowerThenZ = (value, min) => (value <= min);
const unprocess = 422;

const validate = async (name, quantity) => {
  const five = 5;
  const zero = 0;
  productName = await ProductModel.getByProductName(name);

  if (lowerThen(name, five)) return { code: unprocess, err: errors.lowerThenFive};
  if (productName) return { code: unprocess, err: errors.alreadyExists };
  if (lowerThenZ(quantity, zero)) return { code: unprocess, err: errors.lowerThanZero };
  if (isNotAnumber(quantity)) return { code: unprocess, err: errors.notANumber };

  return {};
};

module.exports = {
  validate,
};