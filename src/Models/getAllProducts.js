const connection = require('../Models/connection');
require('dotenv').config();

const getProduct = (result) => {
  console.log(result);
  return result;
};
const getAllProduct = async () => {
  return connection()
    .then((db) =>
      db.collection('products').findAll({}),
    )
    .then((result) => getProduct(result))
    .catch((error) => console.log(`Erro na model de produto: ${error}`));
};

module.exports = {
  getAllProduct,
};