const ProductsModel = require('../Models/ProductsModel');
const status = require('../helpers/statusCode');

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
  const result = await ProductsModel.getProductsById(id);
  if (!result) {
    return res.status(status.unprocess).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong id format'
      }
    });
  }
  res.status(status.ok).json(result);
};

const deleteProductById = async (req, res) => {
  const { id } = req.params;
  const result = await ProductsModel.getProductsById(id);
  if (!result) {
    return res.status(status.unprocess).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong id format'
      }
    });
  }
  await ProductsModel.deleteProductById(id);
  res.status(status.ok).end();
};

const updateProductById = async (req, res) => {
  const { name, quantity } = req.body;
  const { id } = req.params;
  const result = await ProductsModel.updateProductById(id, name, quantity);
  res.status(status.ok).json(result);
};

module.exports = {
  addProduct,
  getAllProducts,
  getProductById,
  updateProductById,
  deleteProductById,
};
