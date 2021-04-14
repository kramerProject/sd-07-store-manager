const productsService = require('../service/productsService');
const status = require('../config/status');

const addProducts = async (req, res, next) => {
  try {
    const { name, quantity } = req.body;
    const newProduct = await productsService.validateProduct(name, quantity);
    if(newProduct.code) return next(newProduct);
    return res.status(status.CREATED).json(newProduct);
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

const getAllProducts = async (req, res, next) => {
  try {
    const list = await productsService.getAllProducts();
    
  } catch (error) {
    console.log(error);
    trow new Error(error);
  }
};

module.exports = {
  addProducts,
};
