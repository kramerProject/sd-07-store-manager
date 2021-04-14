const express = require('express');
const salesController = require('../controllers/salesController');
const middleware = require('../middlewares/middlewares');
const router = express.Router();

router.get('/sales', salesController.getAllSales);
router.get('/sales/:id', salesController.getSaleById);
router.delete('/sales/:id', salesController.deleteSale);

router.post(
  '/sales',
  middleware.validateProductQuantityAndID,
  salesController.addSales
);
router.put(
  '/sales/:id',
  middleware.validateProductQuantityAndID,
  salesController.updateSale
);

module.exports = router;
