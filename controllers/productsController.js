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

const getAllProducts = async (_req, res) => {
  const products = await productsService.getAllProducts();
  res.status(OK).json(products);
};

const findByIdProduct = rescue(async (req, res, next) => {
  const { id } = req.params;
  const product = await productsService.findByIdProduct(id);
  if (product.err) return next(product.err);
  res.status(OK).json(product);
});

const updateProduct = rescue(async (req, res, next) => {
  const { error } = Joi.object({
    name: Joi.string().not().empty().required(),
    quantity: Joi.number().not().empty().required(),
  }).validate(req.body);

  if (error) return next(error);

  const { id } = req.params;
  const { name, quantity } = req.body;

  const updateProd = await productsService.updateProduct(id, name, quantity);

  if (updateProd.err) return next(updateProd.err);

  res.status(OK).json(updateProd);
});

const deleteProduct = rescue(async (req, res, next) => {
  const { id } = req.params;
  const deleteProduct = await productsService.deleteProduct(id);
  if (deleteProduct.err) return next(deleteProduct.err);
  res.status(OK).json(deleteProduct);
});

module.exports = {
  insertProduct,
  getAllProducts,
  findByIdProduct,
  updateProduct,
  deleteProduct,
};
