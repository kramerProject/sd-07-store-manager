const productModel = require('../models/productsModel');
const productServices = require('../services/productsServices');
const status = require('../config/statusTable');

const addProduct = async (req, res) => {
  try {
    const { name, quantity } = req.body;
    const newProduct = await productServices.addWithValidation(name, quantity);
    if (!newProduct.code) {
      res.status(status.add).json(newProduct);
      return;
    }
    res.status(status.invalid_data).json(newProduct);
  } catch (error) {
    console.error(error.message);
    res.status(status.serverError).json({ message: error.message });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await productServices.getAllWithValidation();
    res.status(status.get).json(products);
  } catch (error) {
    
  }
};

module.exports = {
  addProduct,
  getAllProducts,
};
