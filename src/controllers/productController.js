const productModel = require('../models/productModel');
const fs = require('fs').promises;

const OK = 200;
const INTERNAL_SERVER_ERROR = 500;
const OK_CREATE = 201;

const getAll = async (req, res) => {
  try {
    const result = await productModel.getAll();
    return res
      .status(OK)
      .send(result);
  } catch (error) {
    console.error(error);
    return res
      .status(INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

const createProduct = async (req, res) => {
  try {
    const { name, quantity } = req.body;
    const result = await productModel.createProduct(name, quantity);

    return res
      .status(OK_CREATE)
      .send(result);
  } catch (error) {
    console.error(error);
    return res
      .status(INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

module.exports = {
  getAll,
  createProduct,
};