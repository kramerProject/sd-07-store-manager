const Router = require('express').Router();
const {
  checkIdsAndQuantities,
  idParamsExists,
  hasQuantity,
} = require('../middlewares/salesMiddlewares');
const {
  newSale,
  getAll,
  getById,
  deleteById,
  setById,
} = require('../controllers/salesController');

Router.post(
  '/sales', checkIdsAndQuantities, hasQuantity, newSale
);
Router.get('/sales', getAll);
Router.get('/sales/:id', getById);
Router.put(
  '/sales/:id', checkIdsAndQuantities, setById
);
Router.delete(
  '/sales/:id', idParamsExists, deleteById
);

module.exports = Router;