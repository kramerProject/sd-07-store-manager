
const express = require('express');
const salesController = require('../controllers/salesController');
const {validateSales} = require('../middlewares');

const router = express.Router();

router.get('/sales', salesController.getAll);
router.get('/sales/:id', salesController.getSalesById);
router.post('/sales', validateSales, salesController.addSales);
router.put('/sales/:id', validateSales, salesController.updateSales);
router.delete('/sales/:id', salesController.deleteSales);

module.exports = router;
