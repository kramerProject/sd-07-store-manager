// const { Router } = require('express');
const express = require('express');
const controllersProducts = require("../controllers/controllersProducts");

// const routersProducts = new Router();
const router = express.Router();


router.post('/products', controllersProducts.createNew)
/* router.get('/products', controllersProducts.getAll)
router.get('/products/:id', controllersProducts.getById)
router.put('/products/:id', controllersProducts.updateById)
router.delete('/products/:id', controllersProducts.excludeById) */

module.exports = router;
