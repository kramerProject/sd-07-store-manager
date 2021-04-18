const productModel = require('../models/productModel');
const fs = require('fs').promises;

const services = require('../services/productServices');

const {
  statusHttp,
} = services;

const { C_200, C_201, C_404, C_500 } = statusHttp;


const getAllProducts = async (req, res) => {
  try {
    const result = await productModel.getAllProducts();
    return res
      .status(C_200)
      .send({ products: result });
  } catch (error) {
    console.error(error);
    return res
      .status(C_500)
      .json({ message: error.message });
  }
};

const createProduct = async (req, res) => {
  try {
    const { name, quantity } = req.body;
    const result = await productService.createProducts(name, quantity);
    if (result.isError)
      return res
        .status(C_422)
        .send(result);
    // const result = await productModel.createProduct(name, quantity);
    return res
      .status(C_201)
      .send(result);
  } catch (error) {
    console.error(error);
    return res
      .status(C_500)
      .json({ message: error.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await productModel.getProductById(id);
    return res
      .status(C_200)
      .send(result);
  } catch (error) {
    console.error(error);
    return res
      .status(C_500)
      .json({ message: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { name, quantity } = req.body;
    const { id } = req.params;
    const result = await productModel.updateProduct({ id, name, quantity });
    if (!result) {
      res
        .status(C_404)
        .json({ message: error.message });
      return;
    }
    res
      .status(C_200)
      .json({ id, name, quantity });
  } catch (error) {
    console.error(error);
    return res
      .status(C_500)
      .json({ message: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await productModel.deleteProduct(id);
    return res
      .status(C_200)
      .send(result);
  } catch (error) {
    console.error(error);
    return res
      .status(C_500)
      .json({ message: error.message });
  }
};

module.exports = {
  getAllProducts,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
};