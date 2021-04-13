const Product = require('../services/productService');

const create = async (req, res) => {
  const { name, quantity } = req.body;

  const { code, newProduct } = await Product.create(name, quantity);
  res.status(code).json(newProduct);
};

const findAll = async (req, res) => {
  const { code, products } = await Product.findAll();
  res.status(code).json(products);
};

const findById = async (req, res) => {
  const { id } = req.params;
  const { code, product } = await Product.findById(id);
  res.status(code).json(product);
};

const update = async (req, res) => {
  const { id, name, quantity } = req.body;
  const { code, product } = await Product.update(id, name, quantity);
  res.status(code).json(product);
};

module.exports = {
  create,
  findAll,
  findById,
  update,
};
