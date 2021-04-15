const connection = require('../Models/connection');
require('dotenv').config();

const getNewProduct = ({id, name, quantity}) => {
  return {
    _id: id,
    name,
    quantity: Number(quantity)
  };
};
const addProduct = async (name, quantity) => {
  return connection()
    .then((db) =>
      db.collection(process.env.DB_COLLECTION).insertOne({ 
        name: name, 
        quantity: quantity 
      }),
    )
    .then((result) => getNewProduct({ id: result.insertedId, name, quantity }))
    .catch((error) => console.log(`Erro no model addProduct: ${error}`));
};

module.exports = {
  addProduct,
};
