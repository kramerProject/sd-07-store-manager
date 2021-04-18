const { Router } = require('express');
const salesController = require('../controllers/SalesController');

const router = Router();

router.get('/', salesController.getAll);

router.get('/:id', salesController.findById); 

router.post('/', salesController.create);

router.put('/:id', salesController.update);

router.delete('/:id', salesController.exclude);

module.exports = router;