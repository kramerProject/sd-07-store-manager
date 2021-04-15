const express = require('express');
const vendaController =  require('../controllers/vendaController');

const router = express.Router();

router.post('/sales', vendaController.createSale);

module.exports = router;