const ProductModel = require('../models/ProductModel');

const errors = {
  NOT_VALID_NAME: '"name" length must be at least 5 characters long',
  NOT_VALID_QUANTITY: 'Wrong product ID or invalid quantity',
  PRODUCT_EXISTS: 'Product already exists',
  QUANTITY_WRONG_FORMAT: 'Wrong product ID or invalid quantity'
};


const isQuantityGreaterThan = (quantity) => quantity > 0;
const isString = (quantity) => typeof(quantity) === 'string';

const validateQuantity = async function (req, res, next) {
  const sales = req.body;
  const code = 'invalid_data';

  if (sales.some(sale => !isQuantityGreaterThan(sale.quantity))) {
    return res.status(422).json({ err: { code, message: errors.NOT_VALID_QUANTITY}});
  } else if (sales.some(sale => isString(sale.quantity))) {
    return res.status(422).json({ err: { code, message: errors.QUANTITY_WRONG_FORMAT}});
  }
  next();
};


const isProductExists = async (product) => {
  const productRes = await ProductModel.checkIfExists(product);

  return productRes;
};


const validateProductsExistance = async function (req, res, next) {
  const sales = req.body;
  const code = 'invalid_data';

  if (isProduct) return res.status(422).json({ err: { code, message: errors.PRODUCT_EXISTS}});

  next();
};






const quantityError = (code) => {
  return { err: { code, message: errors.NOT_VALID_QUANTITY }};
};

const validateSales = async function (req, res, next) {
  
  const minimum = 5;
  const code = 'invalid_data';
  // const isProduct = await isProductExists(name)



  if (sales.some(sale => !isQuantityGreaterThan(sale.quantity))) {
    console.log('aqui por acaso');
    return res.status(422).json({ err: { code, message: errors.NOT_VALID_QUANTITY}});
  }
  
  return sales;
  // if (isNotValid(name, minimum)) return res.status(422).json({ err: { code, message: errors.NOT_VALID_NAME}})
  // else if (isProduct) return res.status(422).json({ err: { code, message: errors.PRODUCT_EXISTS}})
  // else if (isString(quantity)) return res.status(422).json({ err: { code, message: errors.QUANTITY_WRONG_FORMAT}})
  // else if (!isQuantityGreaterThan(quantity)) return res.status(422).json({ err: { code, message: errors.NOT_VALID_QUANTITY}})
  
};


module.exports = {
  validateQuantity
};