const express = require('express');
const salesController = require('../controllers/salesController');

const router = express.Router();

router.post('/sales', salesController.addSales);

module.exports = router;
