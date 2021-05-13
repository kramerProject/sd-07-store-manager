const connection = require('../config/connection');
const { ObjectId } = require('mongodb');

const insertSale = async (array) => {
  const sales = await connection().then((db) =>
    db.collection('sales').insertOne({ itensSold: [...array] })
  );
  return sales.ops[0];
};

module.exports = {
  insertSale,
};

