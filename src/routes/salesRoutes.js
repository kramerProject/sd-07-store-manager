const express = require('express');
const { salesController } = require('../controllers');

const router = express.Router();

router.get('/sales', salesController.getAll);

router.get('/sales/:id', salesController.getById);

router.post('/sales', salesController.add);

router.put('/sales/:id', salesController.update);

router.delete('/sales/:id', salesController.deleteSale);

module.exports = router;