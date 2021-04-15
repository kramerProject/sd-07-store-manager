const express = require('express');
const salesControllers = require('../controllers/salesControllers');


const router = express.Router();

router.post('/sales', salesControllers.registerSale);
router.get('/sales', salesControllers.getAll);
router.get('/sales/:id', salesControllers.getById);
router.put('/sales/:id', salesControllers.updateSale);

module.exports = router;