const express = require('express');
const rescue = require('express-rescue');
const productsController = require('../controllers/productsController');
const { nameValidate, quantityValidate } = require('../middlewares');

const router = express.Router();

router.use(nameValidate);
router.use(quantityValidate);
router.post('/products', rescue(productsController.create));

module.exports = router;
