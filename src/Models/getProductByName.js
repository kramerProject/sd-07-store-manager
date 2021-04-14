const connection = require('../Models/connection');
require('dotenv').config();

const getProduct = (name) => {
  return name;
};
const getProductByName = async (name) => {
  return connection()
    .then((db) =>
      db.collection(process.env.DB_COLLECTION).findOne({ 
        name: name, 
      }),
    )
    .then((result) => getProduct(result.name))
    .catch((error) => console.log(`Erro na model de produto: ${error}`));
};

module.exports = {
  getProductByName,
};