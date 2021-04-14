const express = require('express');
const saleController = require('../controllers/saleController');
const middlewares = require('../middlewares');

const router = express.Router();

router.get('/sales', saleController.getAll);
router.get('/sales/:id', saleController.getById);
router.post(
  '/sales',
  middlewares.validateSale,
  saleController.createSale
);
router.put(
  '/sales/:id',
  middlewares.validateSale,
  saleController.updateSale
);
router.delete('/sales/:id', saleController.deleteSale);

module.exports = router;
