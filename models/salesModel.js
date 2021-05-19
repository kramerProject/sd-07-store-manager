const connection = require('./connection');

const getAllSales = async () => {
  return await connection()
    .then((db) => db.collection('sales').find().toArray());
};

const createSale = async (itemsSold) => {
  const newSale = await connection()
    .then((db) => db.collection('sales').insertOne({ itemsSold: [...itemsSold] }));
  return { _id: newSale.insertedId, itemsSold };
};

module.exports = {
  getAllSales,
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