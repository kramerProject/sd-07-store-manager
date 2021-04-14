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

module.exports = {
  addProduct
};