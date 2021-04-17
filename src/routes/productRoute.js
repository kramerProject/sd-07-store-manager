const { ProductController } = require('../controllers');

const express = require('express');
const router = express.Router();

router.use(express.json());


router.use('/', ProductController);

module.exports = router;