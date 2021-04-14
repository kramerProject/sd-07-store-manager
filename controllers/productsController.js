const productsService = require('../services/productsService');
const productsModel = require('../models/productsModel');
const okStatus = 200;
const createdStatus = 201;
const unprocessableEntityStatus = 422;

const createProduct = async (req, res) => {
  try {
    const { name, quantity } = req.body;
    const newProduct = await productsService.createProduct(name, quantity);

    res.status(createdStatus).json(newProduct);
  } catch (err) {
    throw new Error(err);
  }
};

const getAllProducts = async (_req, res) => {
  try {
    const products = await productsModel.getAllProducts();
    
    res.status(okStatus).json({products});
  } catch (err) {
    throw new Error(err);
  }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const productById = await productsService.getProductById(id);

    if(productById.err) return res.status(unprocessableEntityStatus).json(productById);

    res.status(okStatus).json(productById);
  } catch (err) {
    throw new Error(err);
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await productsService.deleteProduct(id);

    if(deletedProduct.err) {
      return res.status(unprocessableEntityStatus).json(deletedProduct);
    };

    res.status(okStatus).json(deletedProduct);
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  deleteProduct
};
