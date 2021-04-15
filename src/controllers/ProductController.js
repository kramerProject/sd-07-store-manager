const statusCode = require('../../helpers/HTTPStatus');
const invalidData = 'invalid_data';
const productService = require('../services/ProductService');

const errorMessage = {
  'err': {
    code: invalidData,
    message: ''
  }
};

const getAllProducts = async (_req, res) => {
  try {
    const allProducts = await productService.getAllProducts();  
    res.status(statusCode.SUCCESS).json({products: allProducts});
  } catch (err) {   
    errorMessage.err.message = err.message;
    res.status(statusCode.UNPROCESSABLE).json(errorMessage);  
  }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const productById = await productService.getProductById(id);
    res.status(statusCode.SUCCESS).json(productById);
  } catch (err) {
    errorMessage.err.message = err.message;
    res.status(statusCode.UNPROCESSABLE).json(errorMessage);        
  }
};

const createProduct = async (req, res) => {
  try {
    const { name, quantity } = req.body;
    const newProduct = await productService.createProduct(name, quantity);
    res.status(statusCode.CREATED).json(newProduct);
  } catch (err) {
    errorMessage.err.message = err.message;
    res.status(statusCode.UNPROCESSABLE).json(errorMessage);        
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, quantity } = req.body;
    const updatedProduct = await productService.updateProduct(id, name, quantity);
    res.status(statusCode.SUCCESS).json(updatedProduct);
  } catch (err) {    
    errorMessage.err.message = err.message;
    res.status(statusCode.UNPROCESSABLE).json(errorMessage);        
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await productService.deleteProduct(id);
    res.status(statusCode.SUCCESS).json(deletedProduct);
  } catch (err) {
    errorMessage.err.message = err.message;
    res.status(statusCode.UNPROCESSABLE).json(errorMessage);        
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};
