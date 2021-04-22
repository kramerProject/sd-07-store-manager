const productModel = require('../models/productModel');

const status200 = 200;
const status201 = 201;
const status500 = 500;

const getAllProducts = async (req, res) => {
  try {
    const products = await productModel.getAll();
    return res.status(status200).json(products);
  } catch (err) {
    console.error(err.message);
    return res.status(status500).json({ message: err.message });
  }
};

const getProductsById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productModel.getById(id);
    return res.status(status200).json(product);
  } catch (err) {
    console.error(err.message);
    return res.status(status500).json({ message: err.message });
  }
};

const addProduct = async (req, res) => {
  try {
    const { name, quantity } = req.body;
    const newProduct = await productModel.add(name, quantity);
    return res.status(status201).json(newProduct);
  } catch (err) {
    console.error(err.message);
    return res.status(status500).json({ message: err.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { name, quantity } = req.body;
    const { id } = req.params;

    const updateProduct = await productModel.update(id, name, quantity);
    return res.status(status200).json(updateProduct);
  } catch (err) {
    console.error(err.message);
    return res.status(status500).json({ message: err.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await productModel.exclude(id);
    return res.status(status200).end();
  } catch (err) {
    console.error(err.message);
    return res.status(status500).json({ message: err.message });
  }
};

module.exports = {
  getAllProducts,
  getProductsById,
  addProduct,
  updateProduct,
  deleteProduct
};
