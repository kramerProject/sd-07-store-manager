const express = require('express');
const saleController = require('../controllers/saleController');
// const { nameAndQuantityValidation } = require('../middlewares/nameAndQuantityValidation');

const saleRouters = express.Router();


saleRouters.get('/', saleController.getAllsales);
saleRouters.get('/:id', saleController.getsaleById);
saleRouters.post('/', saleController.addNewsale);
saleRouters.put('/:id', saleController.updateSale);
saleRouters.delete('/:id', saleController.deleteSale);

module.exports = saleRouters;
