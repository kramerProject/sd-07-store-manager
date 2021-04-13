const productModel = require('../models/productsModel');
const productServices = require('../services/productsServices');
const status = require('../config/statusTable');

const addProduct = async (req, res) => {
  try {
    const { name, quantity } = req.body;
    // const newProduct = await productModel.add(name, quantity);
    const newProduct = await productServices.addWithValidation(name, quantity);
    if (!newProduct.code) {
      res.status(status.add).json(newProduct);
      return;
    }
    res.status(status.invalid_data).json(newProduct);
  } catch (error) {
    console.error(error.message);
    res.status(status.serverError).json({ message: error.message });
  }
};

module.exports = {
  addProduct,
};
