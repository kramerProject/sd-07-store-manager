const { findById } = require('../models/ProductsModel');

const isQuantityLessThan = (value, min) => (value < min);
const isString = (value) => (typeof value === 'string');

const minQuantityValue = 1;

const errorMessage = {
  code: 'invalid_data',
  message: 'Wrong product ID or invalid quantity',
};

const errorQtyMessage = {
  code: 'stock_problem',
  message: 'Such amount is not permitted to sell',
};

const validateQuantity = (quantity) => {
  switch (true) {
  case (isQuantityLessThan(quantity, minQuantityValue)):
    return errorMessage;
  case (isString(quantity)):
    return errorMessage;
  default: return {};
  };
};

const validateProductId = async (id) => {
  const idLength = 24;
  if (id.length < idLength) {
    return errorMessage;
  }

  const validate = await findById(id);
  if (validate === null) {
    return errorMessage;
  }

  return {};
};

const validateSales = async (sales) => {
  const result = await sales.map(async ({ productId, quantity }) => {
    const quantityValidate = validateQuantity(quantity);
    if (quantityValidate.message) return 'error';

    const productIdValidate = await validateProductId(productId);
    if (productIdValidate.message) return 'error';

    return 'ok';
  });

  const validateResult = await Promise.all(result);

  if (validateResult.includes('error'))
    return errorMessage;

  return {};
};

const validateSaleId = (id) => {
  const idLength = 24;
  if (id.length < idLength) {
    return errorMessage;
  }

  return {};
};

const productQtyValidation = async (sales) => {
  const result = await sales.map(async (product) => {
    const { quantity: productQty } = await findById(product[0]);
    if (productQty < product[1].quantity ) return 'error';

    return 'ok';
  });

  const validateResult = await Promise.all(result);

  if (validateResult.includes('error'))
    return errorQtyMessage;

  return {};
};

module.exports = {
  validateSales,
  validateQuantity,
  validateProductId,
  validateSaleId,
  productQtyValidation,
};
