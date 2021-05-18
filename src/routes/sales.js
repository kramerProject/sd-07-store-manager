const Router = require('express').Router();
const {
  checkIdsAndQuantities,
  idParamsExists,
} = require('../middlewares/salesMiddlewares');
const {
  newSale,
  getAll,
  getById,
  deleteById,
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
Router.delete(
  '/sales/:id', idParamsExists, deleteById
);

module.exports = Router;