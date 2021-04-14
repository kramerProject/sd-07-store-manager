const productsModel = require('../models/productsModel');
const productsService = require('../services/productsService');

const {
  STATUS_200,
  STATUS_201,
  STATUS_204,
  STATUS_404,
  STATUS_422,
  CODE_ERROR } = require('../valuesGlobal');

const rescue = require('express-rescue');


const getAllproducts = rescue(async (req, res) => {
  try {
    const products = await productsModel.getAll();
    res.status(STATUS_200).json({ products: products });
  } catch (err) {
    throw new Error(err);
  }
});

const getProductById = rescue(async (req, res) => {
  try {
    const { id } = req.params;

    const result = await productsModel.getById(id);

    if (!result) {
      return res.status(STATUS_422).send({ err: {
        code: CODE_ERROR,
        message: 'Wrong id format'}});
    }

    res.status(STATUS_200).json(result);
  } catch (err) {
    throw new Error(err);
  }
});

const addProduct = rescue(async (req, res) => {
  try {
    const { name, quantity } = req.body;
    const newProduct = await productsService.addProductService(name, quantity);

    if (!newProduct) {
      return res.status(STATUS_422).send({ err: {
        code: CODE_ERROR,
        message: 'Product already exists'}});
    }

    res.status(STATUS_201).json(newProduct);
  } catch (err) {
    throw new Error(err);
  }
});

const updateProduct = rescue(async (req, res) => {
  try {
    const { name, quantity } = req.body;
    const { id } = req.params;

    const product = await productsModel.update(id, name, quantity);

    res.status(STATUS_200).json(product);
  } catch (err) {
    throw new Error(err);
  }
});

const deleteProduct = rescue(async (req, res) => {
  try {
    await productsModel.exclude(req.params.id);

    res.status(STATUS_204).end();
  } catch (err) {
    throw new Error(err);
  }
});

module.exports = {
  getAllproducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
};
