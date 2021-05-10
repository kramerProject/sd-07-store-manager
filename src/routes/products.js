const Router = require('express').Router();
const { checkNameAndQuantity, itExists } = require('../middlewares/productMiddleware');
const { newProduct, getAll, getById, setById } = require('../controllers/products');

Router.post(
  '/products', checkNameAndQuantity, itExists, newProduct
);
Router.get('/products/:id', getById);
Router.get('/products', getAll);
Router.put(
  '/products/:id', checkNameAndQuantity, setById
);

module.exports = Router;