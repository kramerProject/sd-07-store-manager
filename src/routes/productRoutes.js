const express = require('express');
const productController = require('../controllers/productController');
const { nameAndQuantityValidation } = require('../middlewares/nameAndQuantityValidation');

const productRouters = express.Router();


productRouters.get('/', productController.getAllProducts);
productRouters.get('/:id', productController.getProductById);
productRouters.post('/', nameAndQuantityValidation, productController.addNewProduct);
productRouters.put('/:id', nameAndQuantityValidation, productController.updateProduct);
productRouters.delete('/:id', productController.deleteProduct);

module.exports = productRouters;
