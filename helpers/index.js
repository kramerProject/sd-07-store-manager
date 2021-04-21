const express = require('express');
const middlewares = require('../middlewares');

const route = express.Router();


const helpersMiddlewares = () => {
  route.use(middlewares.tokenName);
  route.use(middlewares.tokenQuantity);
  route.use(middlewares.tokenExists);
  route.use(middlewares.tokenSales);
  route.use(middlewares.tokenId);
  return route;
};

module.exports = helpersMiddlewares;
