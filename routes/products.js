const express = require('express');
const ProductsModel = require('../models/productsModel');

const {
  nameMiddleware,
  quantityMiddleware
} = require('../middlewares/productsMiddleware');

const productsRoute = express.Router();

const SUCCESS = 200;

const NOT_FOUND = 404;

const INVALID_DATA = 400;

productsRoute.post('/products', nameMiddleware, quantityMiddleware, async (req, res) => {
  const { name, quantity } = req.body;
  const newProduct = await ProductsModel.createProduct(name, quantity);
  console.log(await newProduct)
  return res.status(201).send(newProduct);
})

productsRoute.get('/products', async(req, res) => {
  const allProducts = await ProductsModel.getAllProducts();
  res.status(200).send(allProducts);
})

module.exports = productsRoute;
