const connection = require('../Models/connection');
require('dotenv').config();

const getProduct = (id, name, quantity) => {
  return {_id: id, name, quantity};
};
const getProductById = async (id) => {
  return connection()
    .then((db) =>
      db.collection('products').findOne({ 
        id: id, 
      }),
    )
    .then((result) => getProduct(result.id,result.name,result.quantity ))
    .catch((error) => console.log(`Erro na model de produto: ${error}`));
};

module.exports = {
  getProductById,
};