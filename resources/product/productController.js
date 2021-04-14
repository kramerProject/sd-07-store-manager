const { StatusCodes } = require('http-status-codes');
const { ErrorHandler } = require('../../helpers/error');

const productService = require('./productService');

const addProduct = async (req, res) => {
  const { name, quantity } = req.body;
  
  const insertedProduct = await productService.add(name, quantity);

  if (insertedProduct) {
    res.status(StatusCodes.CREATED).json(insertedProduct);
    return;
  }

  throw new ErrorHandler(
    StatusCodes.UNPROCESSABLE_ENTITY,
    'invalid_data', 
    'Product already exists');
};

module.exports = {
  addProduct,
};