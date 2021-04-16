const { Router } = require('express');
const productController = require('../controllers/ProductController');

const router = Router();

router.get('/', productController.getAll);

router.get('/:id', productController.findById); 

router.post('/', productController.create);

router.put('/:id', productController.update);

router.delete('/:id', productController.exclude);

module.exports = router;