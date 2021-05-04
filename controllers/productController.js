const Product = require('../models/productModel');
const productService = require('../services/productService');
const httpCodes = require('../helper/httpCodes');

const {
  SUCCESS,
  CREATED,
  INVALID_DATA,
  INTERNAL_SERVER_ERROR } = httpCodes;

const getAllProducts = async (req, res) => {
  try {
    const results = await Product.getAllProducts();
  
    return res.status(SUCCESS).json({products: results});
  } catch (err) {
    return res.status(INTERNAL_SERVER_ERROR).json({ message: err.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Product.getProductById(id);
  
    if (!result) throw Error('Wrong id format');
  
    return res.status(SUCCESS).json(result);
  } catch (err) {
    return res.status(INVALID_DATA).json({
      err: {code: 'invalid_data', message: err.message }
    });
  }
};

const createProduct = async (req, res) => {
  const { name, quantity } = req.body;
  const verifications = await productService.verifyEntries(name, quantity);
  try {
    if (verifications) {
      throw Error(verifications);
    }
    const newProduct = await Product.createProduct(name, quantity);
    return res.status(CREATED).json(newProduct);
  } catch (err) {
    return res.status(INVALID_DATA).json({
      err: {code: 'invalid_data', message: err.message }
    });
  }
};

const editProductById = async (req, res) => {
  const { name, quantity } = req.body;
  const {id} = req.params;
  const verifications = await productService.verifyEntries(name, quantity);
  try {
    if (verifications && verifications !== 'Product already exists') {
      throw Error(verifications);
    }
    const editedProduct = await Product.editProductById(name, quantity, id);
    return res.status(SUCCESS).json(editedProduct);
  } catch (err) {
    return res.status(INVALID_DATA).json({
      err: {code: 'invalid_data', message: err.message }
    });
  }
};

const deleteProductById = async (req, res) => {
  const { id } = req.params;
  const result = await Product.getProductById(id);
  try {
    if (!result) throw Error('Wrong id format');
    await Product.deleteProductById(id);
    return res.status(SUCCESS).json(result);
  } catch (err) {
    return res.status(INVALID_DATA).json({
      err: {code: 'invalid_data', message: err.message }
    });
  }
};

module.exports = {
  getAllProducts,
  createProduct,
  getProductById,
  editProductById,
  deleteProductById,
};