const connect = require('../config/connect');

const createSales = async (sales) => {
  return connect().then((db) => db.collection('sales').insertOne(
    { itensSold: [...sales]}))
    .then(sale => sale.ops[0])
    .catch(error => error.message);
};

module.exports = {
  createSales,
};