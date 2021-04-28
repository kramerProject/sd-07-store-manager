const ModelProducts = require('../models/modelProducts');
const status = require('../utils/status');

const addNewProduct = async (req, res) => {
  const { name, quantity } = req.body;
  const newProduct = await ModelProducts.productAdd(name, quantity);
  return res.status(status.created).json(newProduct);
};

const getProducts = async (req, res) => {
  const products = await ModelProducts.productsGet();
  return res.status(status.ok).json({ products });
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  const product = await ModelProducts.productById(id);
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

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const product = await ModelProducts.productById(id);
  if (!product) {
    return res.status(status.unprocessableEntity).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong id format'
      }
    });
  }
  await ModelProducts.productDelete(id);
  res.status(status.ok).end();
};

const updateProduct = async (req, res) => {
  const { name, quantity } = req.body;
  const { id } = req.params;
  const product = await ModelProducts.productUpdate(id, name, quantity);
  res.status(status.ok).json(product);
};

module.exports = {
  addNewProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
