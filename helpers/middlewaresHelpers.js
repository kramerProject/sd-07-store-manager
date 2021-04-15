const { Router } = require('express');
const nameGreaterThan = require('../middlewares/nameGreaterThan');
const quantityGreaterThan = require('../middlewares/quantityGreaterThan');
const nameIsAString = require('../middlewares/nameIsString');
const IsInteger =  require('../middlewares/IsInteger');
const nameAlreadyIncluded = require('../middlewares/nameAlreadyInclude');

const route = Router();

const midd = () => {
  route.use(nameIsAString);
  route.use(IsInteger),
  route.use(nameAlreadyIncluded);
  route.use(nameGreaterThan);
  route.use(quantityGreaterThan);
  return route;
};

module.exports = midd;