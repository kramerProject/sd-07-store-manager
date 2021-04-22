const productsModel = require('../models/productsModel');
const validationProducts = require('../services/productsService');

const OK = 200;
const INTERNAL_SERVER_ERROR = 500;

const insertProduct = async (req, res) => {
  try {
    const { name, quantity } = req.body;
    const result = await validationProducts.insertProduct(name, quantity);
  
    return res.status(result.code).json(result.response);
  } catch (error) {
    console.log(error);
    res.status(INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

const findAll = async (_req, res) => {
  try {
    const results = await productsModel.findAll();
  
    return res.status(OK).json({products: results});
  } catch (error) {
    console.log(error);
    res.status(INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

const findProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await validationProducts.findProductById(id);
  
    return res.status(result.code).json(result.response);
  } catch (error) {
    console.log(error);
    res.status(INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

const updateProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, quantity } = req.body;
    const result = await validationProducts.updateProductById(id, name, quantity);
  
    return res.status(result.code).json(result.response);
  } catch (error) {
    console.log(error);
    res.status(INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await validationProducts.deleteProduct(id);

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
  updateProductById,
  deleteProduct,
};
