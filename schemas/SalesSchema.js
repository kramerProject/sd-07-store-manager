const ProductModel = require('../models/ProductModel');

const errors = {
  NOT_VALID_NAME: '"name" length must be at least 5 characters long',
  NOT_VALID_QUANTITY: '"quantity" must be larger than or equal to 1',
  PRODUCT_EXISTS: 'Product already exists',
  QUANTITY_WRONG_FORMAT: '"quantity" must be a number'
};

// const isNotValid = (name, min) => name.length < min

// const isString = (quantity) => typeof(quantity) === 'string'

// const isProductExists = async (product) => {
//   const productRes = await ProductModel.checkIfExists(product)

//   return productRes
// }

const isQuantityGreaterThan = (quantity) => quantity > 0;
const quantityError = (code) => {
  return { err: { code, message: errors.NOT_VALID_QUANTITY }};
};

const validateSales = async (sales) => {
  console.log('schema');
  const minimum = 5;
  const code = 'invalid_data';
  // const isProduct = await isProductExists(name)



  if (sales.some(sale => !isQuantityGreaterThan(sale.quantity))) {
    console.log('aqui por acaso');
    throw new Error(quantityError(code));
  }
  
  return sales;
  // if (isNotValid(name, minimum)) return res.status(422).json({ err: { code, message: errors.NOT_VALID_NAME}})
  // else if (isProduct) return res.status(422).json({ err: { code, message: errors.PRODUCT_EXISTS}})
  // else if (isString(quantity)) return res.status(422).json({ err: { code, message: errors.QUANTITY_WRONG_FORMAT}})
  // else if (!isQuantityGreaterThan(quantity)) return res.status(422).json({ err: { code, message: errors.NOT_VALID_QUANTITY}})
  
};


module.exports = {
  validateSales
};