const express = require('express');
const { createSalesController } = require('../controllers/salesControllers');
const router = express.Router();

router.route('/sales')
  .post(createSalesController)
  .get(getAllController);

// router.route('/sales/:id')
//   .get();

module.exports = router;