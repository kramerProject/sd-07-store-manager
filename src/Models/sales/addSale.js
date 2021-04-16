const connection = require('../connection');
require('dotenv').config();

const getNewSale = (id, sales) => {
  return {
    _id: id,
    itensSold: sales,
  };
};
const addSale = async (products) => {
  return connection()
    .then((db) =>
      db.collection(process.env.DB_COLLECTION_SALES).insertOne({
        products
      }),
    )
    .then((result) => getNewSale(result.insertedId, products))
    .catch((error) => console.log(`Erro no model addSale: ${error}`));
};

module.exports = {
  addSale,
};
