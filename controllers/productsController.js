const ProductsModel = require('../models/productsModel');
const status = require('../utils/status');

const addProduct = async (req, res) => {
  const { name, quantity } = req.body;
  const newProduct = await ProductsModel.addProduct(name, quantity);
  return res.status(status.created).json(newProduct);
};

const getAllProducts = async (req, res) => {
  const products = await ProductsModel.getAllProducts();
  return res.status(status.ok).json({ products });
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  const product = await ProductsModel.getProductById(id);
  if (!product) {
    return res.status(status.unprocessableEntity).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong id format'
      }
    });
  }
  res.status(status.ok).json(product);
};

const updateProduct = async (req, res) => {
  const { name, quantity } = req.body;
  const { id } = req.params;
  const product = await ProductsModel.updateProduct(id, name, quantity);
  res.status(status.ok).json(product);
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const product = await ProductsModel.getProductById(id);
  if (!product) {
    return res.status(status.unprocessableEntity).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong id format'
      }
    });
  }
  await ProductsModel.deleteProduct(id);
  res.status(status.ok).end();
};

module.exports = {
  addProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
