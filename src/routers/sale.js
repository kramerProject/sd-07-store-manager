const { Router } = require('express');
const controller = require('../controllers/sale');
const { validateSale } = require('../configs/validations');

const saleRouter = new Router();

saleRouter.post('/', validateSale, controller.create);

saleRouter.get('/', controller.getAll);

saleRouter.get('/:id', controller.getById);

saleRouter.put('/:id', validateSale, controller.update);

saleRouter.delete('/:id', controller.deleted);

module.exports = saleRouter;