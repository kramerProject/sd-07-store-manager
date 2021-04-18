const express = require('express');
const router = express.Router();

const ProductSchema = require('../schemas/ProductSchema');
const ProductModel = require('../models/ProductModel');
const ProductService = require('../services/ProductService');
const ApiStatusCode = require('../enums/ApiStatusCode');

const { ValidationMiddleware } = require('../middlewares');

router.post('/products', ValidationMiddleware, async (req, res) => {
  const {name, quantity } = req.body;

  try {
    const result = await ProductModel.createProduct(name, quantity);
    return res.status(ApiStatusCode.SUCCESS_CREATED).json(result);
  } catch (error) {
    return res.status(ApiStatusCode.UNAUTHORIZED).json({ message: error } );
  }
});

router.get('/products', async (_req, res) => {

  try {
    const result = await ProductModel.getAllProducts();
    return res.status(ApiStatusCode.SUCCESS).json({ products: result });
  } catch (error) {
    return res.status(ApiStatusCode.UNAUTHORIZED).json({ message: error } );
  }
});

router.get('/products/:id', async (req, res) => {

  const { id } = req.params;
  
  try {
    const result = await ProductService.getProductById(id);
    return res.status(ApiStatusCode.SUCCESS).send(result);
  } catch (error) {
    return res.status(ApiStatusCode.WRONG_PRODUCT_FORMAT)
      .json(ProductSchema.errors.WRONG_ID_FORMAT);
  }
});

router.put('/products/:id', ValidationMiddleware, async (req, res) => {

  const { id } = req.params;
  const { name, quantity } = req.body;
  
  try {
    const result = await ProductModel.updateProduct(id, name, quantity);
    return res.status(ApiStatusCode.SUCCESS).json(result);
  } catch (error) {
    return res.status(ApiStatusCode.UNAUTHORIZED).json({ message: error.message } );
  }
});

router.delete('/products/:id', async (req, res) => {

  const { id } = req.params;
  
  try {
    const result = await ProductService.deleteProduct(id);
    return res.status(ApiStatusCode.SUCCESS).json(result);
  } catch (error) {
    return res.status(ApiStatusCode.WRONG_PRODUCT_FORMAT)
      .json(ProductSchema.errors.WRONG_ID_FORMAT);
  }
});


module.exports = router;