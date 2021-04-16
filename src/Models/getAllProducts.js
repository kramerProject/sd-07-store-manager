const connection = require('../Models/connection');
require('dotenv').config();

const getProduct = (result) => {
  return result;
};
const getAllProduct = async () => {
  return connection()
    .then((db) => db.collection(process.env.DB_COLLECTION).find({}).toArray())
    .then((result) => getProduct({ products: result }))
    .catch((error) => console.log(`Erro na model de produto: ${error}`));
};

module.exports = {
  getAllProduct,
};
