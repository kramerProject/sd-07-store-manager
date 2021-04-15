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
    res.status(statusCode.INTERNALERROR).json({ message: err.message});        
  }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    res.status(statusCode.SUCCESS).json({id});
  } catch (err) {
    console.error(err.message);
    res.status(statusCode.INTERNALERROR).json({ message: err.message});        
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
    res.status(statusCode.SUCCESS).json({message: `${id} atualizado`});
  } catch (err) {
    console.error(err.message);
    res.status(statusCode.INTERNALERROR).json({ message: err.message});        
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    res.status(statusCode.SUCCESS).json({message: `${id} deletado`});
  } catch (err) {
    console.error(err.message);
    res.status(statusCode.INTERNALERROR).json({ message: err.message});        
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};
