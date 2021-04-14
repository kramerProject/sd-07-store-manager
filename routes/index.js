const { Router } = require('express');

const productRoutes = require('./productsRoute');
const handleError = require('../middleware/errorMiddleware');

const appRoutes = Router();

appRoutes.use('/products', productRoutes);
appRoutes.use(handleError.errorMiddleware);

module.exports = appRoutes;
