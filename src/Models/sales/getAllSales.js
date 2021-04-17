const connection = require('../connection');
require('dotenv').config();

const getNewSale = (salesResult) => {
  console.log(salesResult);
  const result = {sales: salesResult};
  return result;
};
const getAllSales = async () => {
  return connection()
    .then((db) => db.collection('sales').find({}).toArray())
    .then((result) => getNewSale(result))
    .catch((error) => console.log(`Erro no model getAllSales: ${error}`));
};

module.exports = {
  getAllSales,
};
