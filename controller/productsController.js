const ProductsModel = require('../model/productsModel');

// const productsService = require('../services/productsService'); -> utilizar caso necessario

const rescue = require('express-rescue');

const CREATED = 201;

const insertProduct = rescue(async (req, res) => {
  
  const { name, quantity } = req.body;
  const newProduct = await ProductsModel.insert(name, quantity);

  return res.status(CREATED).json(newProduct.ops[0]);
});

module.exports = {
  insertProduct,
};