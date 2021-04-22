const products = require('../services/productService');

const SUCCESS = 200;
const updateCode = 201;
const unprocessableEntity = 422;

const createProduct = async (req, res) => {
  const { name, quantity } = req.body;
  try {
    const result = await products.createProduct(name, quantity);
    if (result.err) return res.status(unprocessableEntity).json(result);
    res.status(updateCode).json(result);
  } catch (error) {
    console.log(error.message);
  }
};

const getAll = async (_req, res) => {
  try {
    const result = await products.getAll();
    res.status(SUCCESS).json(result);
  } catch (error) {
    console.error(error.message);
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await products.getById(id);
    if (result.err) return res.status(unprocessableEntity).json(result);
    res.status(codes.sucess).json(result);
  } catch (error) {
    console.log(error.message);
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await products.deleteProduct(id);
    if (result.err) return res.status(unprocessableEntity).json(result);
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
    if (result.err) res.status(unprocessableEntity).json(result);
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
