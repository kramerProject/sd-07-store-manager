const { Router } = require('express');
const controller = require('../controllers/products');
const { validateProduct } = require('../configs/validations');

const productRouter = new Router();

productRouter.post('/', validateProduct, controller.create);

productRouter.get('/', controller.getAll);

productRouter.get('/:id', controller.getById);

productRouter.put('/:id', validateProduct, controller.update);

productRouter.delete('/:id', controller.deleted);

module.exports = productRouter;