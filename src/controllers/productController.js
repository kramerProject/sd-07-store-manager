const products = require('../services/productService');
const codes = require('../services/codes');
const addProduct = async (req, res) => {
  const { name, quantity } = req.body;
  try {
    const result = await products.addProduct(name, quantity);
    if (result.err) return res.status(codes.notProcessed).json(result);
    res.status(codes.update).json(result);
  } catch (error) {
    console.log(error.message);
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await products.getById(id);
    if (result.err) return res.status(codes.notProcessed).json(result);
    res.status(codes.sucess).json(result);

  } catch (error) {
    console.log(error.message);
  }
};

const getAll = async (_req, res) => {
  try {
    const result = await products.getAll();
    res.status(codes.sucess).json(result);
  } catch (error) {
    console.log(error.message);
  }
};


const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;
  try {
    const result = await products.updateProduct(id, name, quantity);
    if (result.err) res.status(codes.notProcessed).json(result);
    res.status(codes.sucess).json(result);
  } catch (error) {
    console.log(error.message);
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await products.deleteProduct(id);
    if (result.err) return res.status(codes.notProcessed).json(result);
    res.status(codes.sucess).json(result);

  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  addProduct,
  getById,
  getAll,
  updateProduct,
  deleteProduct,
};