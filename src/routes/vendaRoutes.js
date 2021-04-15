const express = require('express');
const vendaController =  require('../controllers/vendaController');

const router = express.Router();

router.get('/sales', vendaController.getAllSale);
router.get('/sales/:id', vendaController.getByIdSale);
router.post('/sales', vendaController.createSale);
router.put('/sales/:id', vendaController.updateSale);
router.delete('/sales/:id', vendaController.deleteByIdSale);
module.exports = router;