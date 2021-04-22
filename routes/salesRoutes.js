const express = require('express');

const salesController = require('../controllers/salesController');
// const middleware = require('../middlewares');

const router = express.Router();

router.get('/sales', salesController.getAllSales);

// router.get('/sales/:id', middleware.idMiddleware, salesController.getProductsById);

// router.put('/sales/:id',
//   middleware.idMiddleware,
//   middleware.updateMiddleware,
//   salesController.updateProduct
// );

// router.delete('/sales/:id',
//   middleware.idMiddleware,
//   salesController.deleteProduct
// );

router.post('/sales', salesController.addSale);
// router.post('/sales', middleware.productMiddleware, salesController.addSale);

module.exports = router;
