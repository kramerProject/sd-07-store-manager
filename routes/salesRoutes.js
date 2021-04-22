const express = require('express');

const salesController = require('../controllers/salesController');
const middleware = require('../middlewares');

const router = express.Router();

router.get('/sales', salesController.getAllSales);

router.get('/sales/:id', middleware.idSaleMiddleware, salesController.getSaleById);

router.put('/sales/:id', middleware.salesMiddleware, salesController.updateSale);

router.delete('/sales/:id', middleware.idDeleteMiddleware, salesController.deleteSale);

router.post('/sales', middleware.salesMiddleware, salesController.addSale);

module.exports = router;
