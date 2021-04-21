const express = require('express');
const productsController = require('../controllers/productsController');

const router = express.Router();

router.post('/products', productsController.addNewProduct);

// router.use(middlewares.errorMiddleware);

module.exports = router;
