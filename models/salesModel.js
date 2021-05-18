const connection = require('./connection');
const createSale = async (itemsSold) => {
  const newSale = await connection()
    .then((db) => db.collection('sales').insertOne({ itemsSold: [...itemsSold] }));
  return { _id: newSale.insertedId, itemsSold };
};

module.exports = {
  createSale,
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