const modelProduct = require('../models/productsModel');
const validateProduct = require('../services/productService');

const OK = 200;
const INTERNAL_SERVER_ERROR = 500;

const insertProduct = async (req, res) => {
  try {
    const { name, quantity } = req.body;
    const result = await validateProduct.insertProduct(name, quantity);

    return res.status(result.code).json(result.response);
  } catch (error) {
    console.log(error);
    res.status(INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

const findAll = async (_req, res) => {
  try {
    const results = await modelProduct.findAll();

    return res.status(OK).json({products: results});
  } catch (error) {
    console.log(error);
    res.status(INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

const findProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await validateProduct.findProductById(id);

    return res.status(result.code).json(result.response);
  } catch (error) {
    console.log(error);
    res.status(INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

module.exports = {
  insertProduct,
  findAll,
  findProductById,
};

