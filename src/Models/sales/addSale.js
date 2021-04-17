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
      db.collection('sales').insertOne({
        itensSold: products
      }),
    )
    .then((result) => getNewSale(result.insertedId, products))
    .catch((error) => console.log(`Erro no model addSale: ${error}`));
};

module.exports = {
  addSale,
};
