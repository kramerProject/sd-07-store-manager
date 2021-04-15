const statusCode = require('../../helpers/HTTPStatus');
const productService = require('../services/ProductService');

const getAllProducts = async (_req, res) => {
  try {    
    res.status(statusCode.SUCCESS).json({message: 'funcionou'});
  } catch (err) {
    console.error(err.message);
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
    console.error(err.message);
    res.status(statusCode.INTERNALERROR).json({ message: err.message});        
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
