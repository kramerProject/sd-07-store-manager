const express = require('express');
const STATUS_CODE = require('../helper');
const { salesController } = require('../controllers');

const route = express.Router();

// (_, res) => { res.send('deu bom'); }
route.post('/sales', salesController.salesRegistration);

module.exports = route;
