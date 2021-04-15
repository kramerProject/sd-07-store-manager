const { Router } = require('express');
const productController = require('../controllers/ProductController');

const router = Router();

router.get('/', productController.getAll);

router.get('/:id', productController.findById); 

router.post('/', productController.create);

module.exports = router;