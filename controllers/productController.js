const prodService = require('../services/productService');

const erro500 = 500;
const success = 200;

const createProduct = async (req, res) => {
  try {
    const { name, quantity } = req.body;
    const result = await prodService.addProduct(name, quantity);
    res.status(result.status).json(result.response);
  } catch (error) {
    console.error(error.message);
    res.status(erro500).json({ message: 'Internal Server Error'});
  }
};

const getAll = async (_req, res) => {
  try {
    const result = await prodService.getAll();
    res.status(success).json(result);
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

const updateProduct = async (req, res) => {
  try {
    const {id} = req.params;
    const {name, quantity} = req.body;
    const result = await prodService.updateProduct(id, name, quantity);
    res.status(result.status).json(result.response);
  } catch (error) {
    console.error(error.message);
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await prodService.deleteProduct(id);
    res.status(result.status).json(result.response);
  } catch (error) {
    console.error(error.message);
  }
};

module.exports = {
  createProduct,
  getAll,
  getById,
  updateProduct,
  deleteProduct
};
