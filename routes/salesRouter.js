const express = require('express');
const {
  createSalesController,
  getAllController,
  getByIdController,
  updateSalesController,
} = require('../controllers/salesControllers');
const router = express.Router();

router.route('/sales')
  .post(createSalesController)
  .get(getAllController);

router.route('/sales/:id')
  .get(getByIdController)
  .put(updateSalesController);

module.exports = router;