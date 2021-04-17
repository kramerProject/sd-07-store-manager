const conn = require('./connection');

const findAll = async () => {
  const result = await conn().then((db) => db.collection('sales').find().toArray());
  return JSON.stringify({ sales: [...result] });
};

const findById = async (id) => {
  const result = await conn()
    .then((db) => db.collection('sales').find({ _id: id }).toArray());
  return result[0];
};
const insertNewSale = async (sales) => {
  const { insertedId } = await conn().then((db) =>
    db.collection('sales').insertOne({ itensSold: [...sales] }),
  );
  return {
    _id: insertedId,
    itensSold: [...sales]
  };
};

module.exports = {
  insertNewSale,
  findAll,
  findById,
};