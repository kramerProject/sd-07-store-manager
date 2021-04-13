const express = require('express');

const router = express.Router();

router.get('/products', () => console.log('/products'));

module.exports = router;