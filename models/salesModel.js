const connection = require('./connection');

const getAllSales = async () => {
  return await connection()
    .then((db) => db.collection('sales').find().toArray());
};

const createSale = async (itemsSold) => {
  const newSale = await connection()
    .then((db) => db.collection('sales').insertOne({ itensSold: [itemsSold] }));
  return { _id: newSale.ops[0].insertedId, itensSold: itemsSold };
};

// const saleById = async (id) => {
//   const saleData = await connection()
//     .then((db) => db.collection('sales').findOne(new ObjectId(id)));
//   if(!saleData) return null;
//   return saleData;
// };

module.exports = {
  getAllSales,
  createSale,
  // saleById,
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