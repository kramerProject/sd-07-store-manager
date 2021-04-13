const express = require('express');
const Sales = require('../Controllers/Sales');

const router = express.Router();

router.route('/sales')
  .post(Sales.create);


module.exports = router;