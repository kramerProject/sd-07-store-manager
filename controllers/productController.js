const { productModel } = require('../models');
const status = require('../status');

const addProduct = async (req, res) => {
  try {
    const { name, quantity } = req.body;
    const newProduct = await productModel.add(name, quantity);
    res.status(status.CREATED).json(newProduct);
  } catch (err) {
    res.status(status.INTERNAL_SERVER_ERROR).json(err.message);
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await productModel.getAll();
    res.status(status.OK).json({ products });
  } catch (err) {
    res.status(status.INTERNAL_SERVER_ERROR).json(err.message);
  }
};

const getPoductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productModel.getById(id);
    return res.status(status.OK).json(product);
  } catch (err) {
    res.status(status.INTERNAL_SERVER_ERROR).json(err.message);
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = {
      _id: id,
      name: req.body.name,
      quantity: req.body.quantity
    };
    const product = await productModel.update(updateData);
    return res.status(status.OK).json(product);
  } catch (err) {
    res.status(status.INTERNAL_SERVER_ERROR).json(err.message);
  }
};

module.exports = {
  addProduct,
  getAllProducts,
  getPoductById,
  updateProduct
};