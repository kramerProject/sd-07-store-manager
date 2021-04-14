const connection = require('../config/connections');

const createSales = async (itensSold) => {
  const newSale = await connection().then((db) =>
    db.collection('sales').insertOne({ itensSold }),
  );
  return { _id: newSale.insertedId, itensSold };
};

const getAllSales = async () =>
  connection().then((db) => db.collection('sales').find().toArray());


module.exports = {
  createSales,
  getAllSales
};