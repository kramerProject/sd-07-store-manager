const Router = require('express').Router();
const {
  checkNameAndQuantity,
  itExists,
  idExists } = require('../middlewares/productMiddleware');
const {
  newProduct,
  getAll,
  getById,
  setById,
  deleteById } = require('../controllers/products');

Router.post(
  '/products', checkNameAndQuantity, itExists, newProduct
);
Router.get('/products', getAll);
Router.get('/products/:id', getById);
Router.put(
  '/products/:id', checkNameAndQuantity, setById
);
Router.delete(
  '/products/:id', idExists, deleteById
);

module.exports = Router;