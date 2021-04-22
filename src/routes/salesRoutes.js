const express = require('express');
const {
  postNewSale,
  getAll,
  getSale,
  editSale,
  deleteSale
} = require('../controller/salesController');

const route = express.Router();

route.post('/sales', postNewSale);
route.get('/sales', getAll);
route.get('/sales/:id', getSale);
route.put('/sales/:id', editSale);
route.delete('/sales/:id', deleteSale);

module.exports = route;
