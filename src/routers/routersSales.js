const express = require('express');
const controllersSales = require("../controllers/controllersSales");

const router = express.Router();


router.get('/products', controllersSales.getAll)
router.get('/products/:id', controllersSales.getById)
router.post('/products', controllersSales.createNew)
router.del('/products/:id', controllersSales.excludeById)
router.put('/products/:id', controllersSales.updateById)

module.exports = routersSales;
