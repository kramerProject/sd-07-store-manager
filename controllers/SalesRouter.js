const { Router } = require('express');
const SalesServices = require('../services/SalesServices');

const router = new Router();

router.post('/', SalesServices.registerSale);

router.get('/', SalesServices.getAllSales);

router.get('/:id', SalesServices.getById);

module.exports = router;
