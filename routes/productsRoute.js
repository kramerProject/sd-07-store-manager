const express = require('express');
const rescue = require('express-rescue');
const productsController = require('../controllers/productsController');
const { nameValidate, quantityValidate } = require('../middlewares');

const router = express.Router();

router.get('/products/:id', rescue(productsController.getById));
router.get('/products', rescue(productsController.getAll));
router.use(nameValidate);
router.use(quantityValidate);
router.post('/products', rescue(productsController.create));

module.exports = router;
