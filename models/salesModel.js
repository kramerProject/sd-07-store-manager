const connection = require('../config/connection');
const { ObjectId } = require('mongodb');

const insertSale = async (array) => {
  const sales = await connection().then((db) =>
    db.collection('sales').insertOne({ itensSold: [...array] })
  );
  return sales.ops[0];
};

const findAll = async () =>
  connection()
    .then((db) => db.collection('sales').find().toArray());

const findSaleById = async (id) => {
  const result = await connection()
    .then((db) => db.collection('sales').findOne(ObjectId(id)));
  return result;
};

const updateSaleById = async (id, array) =>
  connection().then(async (db) => {
    const sales = await db
      .collection('sales')
      .updateOne({ _id: ObjectId(id) }, { $set: { itensSold: [...array] } });
    return findSaleById(id);
  });

const deleteSale = async (id) =>
  connection().then((db) => db.collection('sales').deleteOne({ _id: ObjectId(id) }));

module.exports = {
  insertSale,
  findAll,
  findSaleById,
  updateSaleById,
  deleteSale,
};

