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

module.exports = {
  getAllProducts,
  addProduct
};
