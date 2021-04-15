const express = require('express');
const router = express.Router();

router.get('/products', '');
router.get('/products/:id', '');
router.post('/products', '');
router.put('/products/:id', '');
router.delete('/products/:id', '');

module.exports = router;