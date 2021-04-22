const productsService = require('../services/productsService');
const rescue = require('express-rescue');

const createdStatus = 201;
const okStatus = 200;

const addNewProduct = rescue(async (req, res) => {
  const { name, quantity } = req.body;
  const newProduct = await productsService.add(name, quantity);

  res.status(createdStatus).json(newProduct);
});

const getAllProducts = rescue(async (req, res) => {
  const products = await productsService.getAll();
  res.status(okStatus).json({products: products});
});

const getByID = rescue(async (req, res) => {
  const { id } = req.params;
  const result = await productsService.getByID(id);
  res.status(okStatus).json(result);
});

const updateByID = rescue(async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;
  const updatedProduct = await productsService.update(id, name, quantity);

  res.status(okStatus).json(updatedProduct);
});

const deleteByID = rescue(async (req, res) => {
  const { id } = req.params;
  const product = await productsService.excludeByID(id);

  res.status(okStatus).json(product);
});

// const getByID = rescue(async (req, res) => {

// });

module.exports = {
  addNewProduct,
  getAllProducts,
  getByID,
  updateByID,
  deleteByID,
};
