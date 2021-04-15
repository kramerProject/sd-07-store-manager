const { Router } = require('express');

const productRoutes = require('./productsRoute');
const salesRoutes = require('./salesRoute');
const handleError = require('../middleware/errorMiddleware');

const appRoutes = Router();

appRoutes.use('/products', productRoutes);
appRoutes.use('/sales', salesRoutes);
appRoutes.use(handleError.errorMiddleware);

module.exports = appRoutes;
