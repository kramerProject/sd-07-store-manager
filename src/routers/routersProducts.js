const { Router } = require('express');
const controllersProducts = require('../controllers/controllersProducts');

const routersProducts = Router();

routersProducts.post('/', controllersProducts.createNew);

routersProducts.get('/', controllersProducts.getAll);
routersProducts.get('/:id', controllersProducts.getById);

routersProducts.put('/:id', controllersProducts.updateById);
routersProducts.delete('/:id', controllersProducts.excludeById);

module.exports = routersProducts;
