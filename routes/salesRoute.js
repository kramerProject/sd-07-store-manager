const express = require('express');
const rescue = require('express-rescue');
const salesController = require('../controllers/salesController');
const { quantityOrWrongId } = require('../middlewares');

const router = express.Router();

router.post('/sales', quantityOrWrongId, rescue(salesController.create));

module.exports = router;

