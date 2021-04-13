const express = require('express');
const productController = require('../controllers/productController');

const productRouters = express.Router();


productRouters.get('/', productController.getAllProducts);
productRouters.get('/:id', productController.getProductById);
productRouters.post('/', productController.addNewProduct);
productRouters.put('/:id', productController.updateProduct);
productRouters.delete('/:id', productController.deleteProduct);

module.exports = productRouters;
