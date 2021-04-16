const connection = require('./conn');
const { ObjectId } = require('mongodb');

const addSales = async (data) => {
  const { insertedId } = await connection().then((db) =>
    db.collection('sales').insertOne({ itensSold: data }),
  );
  return {
    _id: insertedId,
    itensSold: data,
  };
};
module.exports = { addSales };
