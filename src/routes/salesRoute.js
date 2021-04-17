const { SalesController } = require('../controllers');

const express = require('express');
const router = express.Router();

router.use(express.json());


router.use('/', SalesController);

module.exports = router;