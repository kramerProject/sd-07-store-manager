const rescue = require('express-rescue');

const Products = require('../services/ProductsService')

const getAll = rescue(async (req, res) => {
  const products = await Products.getAll();

  res.status(200).json(products);
});

const findById = (req, res) => {

};

const create = async (req, res) => {
  const { name, quantity } = req.body;
  const { code, message, product } = await Products.create(name, quantity);

  if (message) return res.status(422).send({ err: { code: code, message: message } });

  res.status(code).send(product);
};

const deleteById = (req, res) => {

};

const updateById = (req, res) => {

}

module.exports = {
  getAll,
  findById,
  create,
  deleteById,
  updateById
}
