const express = require('express');
const {
  createSalesController,
  getAllController,
  getByIdController,
} = require('../controllers/salesControllers');
const router = express.Router();

router.route('/sales')
  .post(createSalesController)
  .get(getAllController);

router.route('/sales/:id')
  .get(getByIdController);

module.exports = router;