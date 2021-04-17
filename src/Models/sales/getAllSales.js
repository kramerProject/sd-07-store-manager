const connection = require('../connection');
require('dotenv').config();

const getNewSale = (salesResult) => {
  console.log(salesResult);
  const result = {sales: salesResult};
  return result;
};
const getAllSales = async () => {
  return connection()
    .then((db) => db.collection(process.env.DB_COLLECTION_SALES).find({}).toArray())
    .then((result) => getNewSale(result))
    .catch((error) => console.log(`Erro no model getAllSales: ${error}`));
};

module.exports = {
  getAllSales,
};
