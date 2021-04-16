const Product = require('../models/productModel');
const productService = require('../services/productService');
const statusCodes = require('../utils/statusCodes');

const getAll = async (_req, res) => {
  try {
    const results = { products: await Product.getAll() };
    res.status(statusCodes.OK).json(results);
  } catch (err) {
    console.error(err);
    res.status(statusCodes.SERVER).json({ message: err.message });
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await productService.getByIdService(id);
    res.status(result.status).json(result.msg);
  } catch (err) {
    console.error(err);
    res.status(statusCodes.SERVER).json({ message: err.message });
  }
};


const createProduct = async (req, res) => {
  try {
    const { name, quantity } = req.body;
    const result = await Product.create(name, quantity);
    res.status(statusCodes.CREATED).json(result);
  } catch (err) {
    console.error(err);
    res.status(statusCodes.SERVER).json({ message: err.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, quantity } = req.body;
    const result = await Product.update( id, name, quantity );
    res.status(statusCodes.OK).json({ id, name, quantity });

  } catch (err) {
    console.error(err);
    res.status(statusCodes.SERVER).json({ message: err.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await productService.deleteProductService(id);
    res.status(result.status).json(result.msg);
  } catch (err) {
    console.error(err);
    res.status(statusCodes.SERVER).json({ message: err.message });
  }
};


module.exports = {
  getAll,
  getById,
  createProduct,
  updateProduct,
  deleteProduct
};
