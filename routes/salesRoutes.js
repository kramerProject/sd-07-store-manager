const express = require('express');
const sales = require('../controllers/salesController');

const router = express.Router();

router.post('/sales', sales.createSale);
router.get('/sales', sales.getAll);
router.get('/sales/:id', sales.getById);
router.put('/sales/:id', sales.updateSale);

module.exports = router;