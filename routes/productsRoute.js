const express = require('express');
const app = express.Router();

const productController = require('../controllers/productController');
const nameMiddleware = require('../middlewares/nameMiddleware');
const quantityMiddleware = require('../middlewares/quantityMiddlewares');

app.use(nameMiddleware);
app.use(quantityMiddleware);
app.post('/',productController.insertProduct);

module.exports = app;
