const rescue = require('express-rescue');

const Products = require('../services/ProductsService');

const CODE_200 = 200;
const CODE_422 = 422;

const getAll = rescue(async (req, res) => {
  const products = await Products.getAll();

  res.status(CODE_200).json(products);
});

const findById = rescue( async (req, res) => {
  const { id } = req.params;
  const product = await Products.findById(id);

  res.status(CODE_200).json(product);
});

const create = async (req, res) => {
  const { name, quantity } = req.body;
  const { code, message, product } = await Products.create(name, quantity);

  if (message) return res.status(CODE_422).send(
    { err: 
      { code: code, message: message }
    });

  res.status(code).send(product);
};

const deleteById = (req, res) => {

};

const updateById = (req, res) => {

};

module.exports = {
  getAll,
  findById,
  create,
  deleteById,
  updateById
};
