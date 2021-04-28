const express = require('express');
const salesController = require('../controllers/controllersSales');
const middleware = require('../middlewares/middlewares');
const router = express.Router();

router.get('/sales', salesController.getSales);
router.get('/sales/:id', salesController.getSaleById);
router.delete('/sales/:id', salesController.deleteSale);

router.post(
  '/sales',
  middleware.validateProductAmmountAndID,
  salesController.addNewSales
);
router.put(
  '/sales/:id',
  middleware.validateProductAmmountAndID,
  salesController.updateSale
);

module.exports = router;
