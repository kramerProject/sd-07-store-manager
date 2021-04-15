const express = require('express');
const saleController = require('../controllers/saleController');
const middleware = require('../middlewares');

const router = express.Router();

router.post('/sales', middleware.salePostMiddleware,
  middleware.quantityProductMiddleware, saleController.create);
router.get('/sales', saleController.findAll);
router.get('/sales/:id', middleware.saleExistMiddleware,
  saleController.findById);
router.put('/sales/:id', middleware.saleExistMiddleware,
  middleware.salePostMiddleware, middleware.quantityProductMiddleware,
  saleController.update);
router.delete('/sales/:id', middleware.saleIdExistMiddleware,
  saleController.exclude);

router.use(middleware.errorMiddleware);

module.exports = router;
