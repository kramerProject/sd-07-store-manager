const express = require('express');
const salesController = require('../controllers/salesController');

const router = express.Router();

router.post('/sales', salesController.addNewSale);
router.get('/sales', salesController.getAllsales);
router.get('/sales/:id', salesController.getByID);
router.put('/sales/:id', salesController.updateByID);
// router.delete('/sales/:id', salesController.deleteByID);


module.exports = router;
