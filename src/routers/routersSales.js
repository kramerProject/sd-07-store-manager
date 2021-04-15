const { Router } = require('express');
const express = require('express');
const controllersSales = require("../controllers/controllersSales");

const router = express.Router();
// const saleRouter = new Router();


/* router.post('/', controllersSales.createNew)
router.get('/', controllersSales.getAll)
router.get('/:id', controllersSales.getById)
router.del('/:id', controllersSales.excludeById)
router.put('/:id', controllersSales.updateById) */

module.exports = router;
// module.exports = saleRouter;
