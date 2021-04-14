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

const getProductById = async (req, res) => {
  const { id } = req.params;

  const foundProduct = await productService.findById(id);
  if (foundProduct) {
    res.status(StatusCodes.OK).json(foundProduct);
    return;
  }
  throw new ErrorHandler(
    StatusCodes.UNPROCESSABLE_ENTITY,
    'invalid_data', 
    'Wrong id format');
};

const getAllProducts = async (_req, res) => {
  const allProducts = await productService.findAll();
  res.status(StatusCodes.OK).json(allProducts);
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;

  const updatedProduct = await productService.update(id, name, quantity);
  if(updatedProduct) {
    res.status(StatusCodes.OK).json(updatedProduct);
    return;
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const deletedProduct = await productService.del(id);
  if (deletedProduct) {
    res.status(StatusCodes.OK).json(deletedProduct);
    return;
  }
  throw new ErrorHandler(
    StatusCodes.UNPROCESSABLE_ENTITY,
    'invalid_data', 
    'Wrong id format');
};

module.exports = {
  addProduct,
  getProductById,
  getAllProducts,
  updateProduct,
  deleteProduct,
};