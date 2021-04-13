const express = require('express');
const router = express();

router.get('/sales', (req, res) => res.send('Sales'));

module.exports = router;
