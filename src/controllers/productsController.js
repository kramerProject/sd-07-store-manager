const productsService = require('../services/productsService');
const rescue = require('express-rescue');

const addNewProduct = rescue(async (req, res) => {
  const { name, quantity } = req.body;
  const newProduct = await productsService.add(name, quantity);
  const createdStatus = 201;

  res.status(createdStatus).json(newProduct);

});

module.exports = {
  addNewProduct,
};
