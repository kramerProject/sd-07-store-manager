const productsService = require('../services/productsService');
const productsModel = require('../models/productsModel');
const createdStatus = 201;
const okStatus = 200;

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

    return res.status(okStatus).json(products);
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = {
  createProduct,
  getAllProducts
};
