const express = require('express');
const salesController = require('../controller/sales.js');

const router = express.Router();

router.get('/sales', salesController.getAll);
router.get('/sales/:id', salesController.getById);
router.post('/sales', salesController.addSale);
router.put('/sales/:id', salesController.update);
router.delete('/sales/:id', salesController.remove);

module.exports = router;
