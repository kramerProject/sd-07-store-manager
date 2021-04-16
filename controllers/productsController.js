const Joi = require('joi');
const rescue = require('express-rescue');
const productsService = require('../services/productsService');

const SUCCESS = 201;
const OK = 200;

const insertProduct = rescue(async (req, res, next) => {
  const { error } = Joi.object({
    name: Joi.string().not().empty().required(),
    quantity: Joi.number().not().empty().required(),
  }).validate(req.body);

  if (error) return next(error);

  const { name, quantity } = req.body;

  const newProduct = await productsService.insertProduct(name, quantity);

  if (newProduct.err) return next(newProduct.err);

  res.status(SUCCESS).json(newProduct);
});

const getAllProducts = async (req, res) => {
  const products = await productsService.getAllProducts();
  res.status(OK).json(products);
};

const findByIdProduct = rescue(async (req, res, next) => {
  const { id } = req.params;
  const product = await productsService.findByIdProduct(id);
  if (product.err) return next(product.err);
  res.status(OK).json(product);
});

module.exports = {
  insertProduct,
  getAllProducts,
  findByIdProduct,
};
