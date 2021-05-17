const connection = require('./connection');
// const { ObjectId } = require('mongodb');

const createSale = async (itemsSold) => {
  await connection()
    .then((db) => db.collection('sales').insertOne({ itemsSold: [...itemsSold] }));
  return { _id: prod.insertedId, itemsSold };
};

/*
db.sales.insertOne({
  "itensSold": [{
  "productId": "product_id5",
  "quantity": "product_quantity5",
  },
  {
  "productId": "product_id6",
  "quantity": "product_quantity6",
  },]
});
*/

module.exports = {
  createSale,
};