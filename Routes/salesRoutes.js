const express = require('express');
const salesController = require('../Controllers/salesController');

const router = express.Router();

router.post('/sales', salesController.addSales);

module.exports = router;