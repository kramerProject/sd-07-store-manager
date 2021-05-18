const Router = require('express').Router();
const {
  checkIdsAndQuantities,
} = require('../middlewares/salesMiddlewares');
const {
  newSale,
  getAll,
  getById,
//   setById,
} = require('../controllers/salesController');

Router.post(
  '/sales', checkIdsAndQuantities, newSale
);
Router.get('/sales', getAll);
Router.get('/sales/:id', getById);
// Router.put(
//   '/products/:id', checkNameAndQuantity, setById
// );
// Router.delete(
//   '/products/:id', idParamsExists, deleteById
// );

module.exports = Router;