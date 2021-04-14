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
    res.status(status.invalid_data).json({err: newProduct});
  } catch (error) {
    console.error(error.message);
    res.status(status.serverError).json({ message: error.message });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await productServices.getAllWithValidation();
    res.status(status.get).json({ products });
  } catch (error) {
    console.error(error.message);
    res.status(status.serverError).json({ message: error.message });
  }
};

const getProductsById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productServices.getOneWithValidation(id);
    if (!product.code) {
      res.status(status.get).json(product);
      return;
    }
    res.status(status.invalid_data).json({err: product});
  } catch (error) {
    console.error(error.message);
    res.status(status.serverError).json({ message: error.message });
  }
};

const updateProductsById = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, quantity } = req.body;
    const updatedProduct = await productServices.updateWithValidation(id, name, quantity);
    if (!updatedProduct.code) {
      res.status(status.get).json(updatedProduct);
      return;  
    }
    res.status(status.invalid_data).json({err: updatedProduct});
  } catch (error) {
    console.error(error.message);
    res.status(status.serverError).json({ message: error.message });
  }
};

const excludeProductsById = async (req, res) => {
  try {
    const { id } = req.params;
    const excludedProduct = await productServices.excludeWithValidation(id);
    if (!excludedProduct.code) {
      res.status(status.get).json(excludedProduct);
      return;
    }
    res.status(status.invalid_data).json({err: excludedProduct});
  } catch (error) {
    console.error(error.message);
    res.status(status.serverError).json({ message: error.message });
  }
};

module.exports = {
  addProduct,
  getAllProducts,
  getProductsById,
  updateProductsById,
  excludeProductsById,
};
