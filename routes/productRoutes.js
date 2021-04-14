const express = require('express');
const productController = require('../controllers/productController');
const middlewares = require('../middlewares');

const router = express.Router();

//router.get('/products', songController.getAllSongs);
//router.get('/songs/:id', songController.getSongById);
router.post(
    '/products',
    middlewares.validateNameMiddleware,
    middlewares.validateNameDuplicatedMiddleware,
    middlewares.validateQuantityMiddleware, 
    productController.createProduct
    );
//router.put('/songs/:id', songController.updateSong);
//router.delete('/songs/:id', songController.deleteSong);

module.exports = router;