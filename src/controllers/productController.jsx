const prodService = require('../services/productService');

const SUCCESS = 200;
const updateCode = 201;
const notProcessed = 422;

const createProduct = async (req, res) => {
  const { name, quantity } = req.body;
  try {
    const result = await products.createProduct(name, quantity);
    if (result.err) return res.status(notProcessed).json(result);
    res.status(updateCode).json(result);
  } catch (error) {
    console.log(error.message);
  }
};

const getAll = async (_req, res) => {
  try {
    const result = await prodService.getAll();
    res.status(SUCCESS).json(result);
  } catch (error) {
    console.error(error.message);
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await prodService.getById(id);
    res.status(result.status).json(result.response);
  } catch (error) {
    console.error(error.message);
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await products.deleteProduct(id);
    if (result.err) return res.status(notProcessed).json(result);
    res.status(SUCCESS).json(result);
  } catch (error) {
    console.log(error.message);
  }
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;
  try {
    const result = await products.updateProduct(id, name, quantity);
    if (result.err) res.status(notProcessed).json(result);
    res.status(SUCCESS).json(result);
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  createProduct,
  getAll,
  getById,
  deleteProduct,
  updateProduct,
};
