const productsService = require('../service/productsService');
const status = require('../config/status');

const addProducts = async (req, res, next) => {
  try {
    const { name, quantity } = req.body;
    const newProduct = await productsService.validateProduct(name, quantity);
    if (newProduct.code) return next(newProduct);
    return res.status(status.CREATED).json(newProduct);
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

const getAllProducts = async (_req, res, next) => {
  try {
    const list = await productsService.getAllProducts();
    if (list.code) return next(list);
    return res.status(status.SUCCESS).json(list);
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

const getByIdProducts = async (req, res, next) => {
  try {
    const { id } = req.params;
    const list = await productsService.getByIdProducts(id);
    if (list.code) return next(list);
    return res.status(status.SUCCESS).json(list);
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

module.exports = {
  addProducts,
  getAllProducts,
  getByIdProducts,
};
