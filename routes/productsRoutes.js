const express = require('express');
const rescue = require('express-rescue');

const router = express.Router();

app.post('/products', rescue(productsController));

module.exports = router;
