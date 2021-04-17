const { Router } = require('express');
const controllersSales = require('../controllers/controllersSales');

const routersSales = Router();

routersSales.post('/', controllersSales.createNew);
routersSales.get('/', controllersSales.getAll);
routersSales.get('/:id', controllersSales.getById);
routersSales.put('/:id', controllersSales.updateById);
routersSales.delete('/:id', controllersSales.excludeById);

module.exports = routersSales;
