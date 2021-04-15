const productModel = require('../models/productModel');
const fs = require('fs').promises;

const services = require('../services/productServices');

const {
  statusHttp,
} = services;

const { C_200, C_201, C_500 } = statusHttp;


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
    const result = await productModel.createProduct(name, quantity);

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

module.exports = {
  getAllProducts,
  createProduct,
  getProductById,
};