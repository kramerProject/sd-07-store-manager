const products = require('../models/productsModels');
const productsValidate = require('../services/productsService');

const STATUS200 = 200;
const STATUS500 = 500;

const addProduct = async (req, res) => {
  try {
    const { name, quantity } = req.body;
    const result = await productsValidate.addProduct(name, quantity);
  
    return res.status(result.code).json(result.response);
  } catch (error) {
    console.log(error);
    res.status(STATUS500).json({ message: error.message });
  }
};

const getAll = async (_req, res) => {
  try {
    const results = await products.getAll();
  
    return res.status(STATUS200).json({products: results});
  } catch (error) {
    console.log(error);
    res.status(STATUS500).json({ message: error.message });
  }
};

const getByProductId = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await productsValidate.getByProductId(id);
  
    return res.status(result.code).json(result.response);
  } catch (error) {
    console.log(error);
    res.status(STATUS500).json({ message: error.message });
  }
};

module.exports = {
  addProduct,
  getAll,
  getByProductId,
};
