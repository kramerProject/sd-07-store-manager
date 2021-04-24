const express = require('express');
const { creatProductController } = require('../../controllers');

const route = express.Router();

route.post('/products', creatProductController);

module.exports = route;