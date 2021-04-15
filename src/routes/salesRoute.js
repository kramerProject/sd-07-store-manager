const express = require('express');
const {
  handleNewSale,
  getAll,
  getById,
  updateById,
  deleteById,
} = require('../controllers/salesController');

const router = express.Router();

router.post('/sales', handleNewSale);
router.get('/sales', getAll);
router.get('/sales/:id', getById);
router.put('/sales/:id', updateById);
router.delete('/sales/:id', deleteById);

module.exports = router;
