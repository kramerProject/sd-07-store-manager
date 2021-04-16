const express = require('express');

// Controllers
const { addProduct } = require('../controllers/productController');
const { getAllProduct } = require('../controllers/productController');
const { getProductById } = require('../controllers/productController');
const { updateProduct } = require('../controllers/productController');
const { deleteProduct } = require('../controllers/productController');

// Esse product vai ser feito com middlewares
// Middlewares
const validateProductData = require('../middlewares/validateProductData');
const validateId = require('../middlewares/validateId');
const existingProduct = require('../middlewares/existingProduct');

// routes Product
const routes = express.Router();

routes.post('/products', existingProduct, validateProductData, addProduct);

routes.get('/products', getAllProduct);
routes.get('/products/:id', validateId,  getProductById);

routes.put('/products/:id', validateProductData, updateProduct);

routes.delete('/products/:id', validateId, deleteProduct);

module.exports = routes;