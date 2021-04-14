const productsService = require('../services/productsService');

const STATUS_CREATED = 201;

const createProduct = async (req, res) => {
  const { name, quantity } = req.body;
  const newProduct = await productsService.createProduct(name, quantity);

  res.status(STATUS_CREATED).json(newProduct);
};

module.exports = { createProduct };
