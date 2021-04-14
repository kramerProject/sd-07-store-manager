const connection = require('../config/conn');
const { ObjectId } = require('mongodb');

const addSales = async (array) => {
  const sales = await connection().then((db) => 
    db.collection('sales').insertOne({itensSold: [...array]})
  );

  return sales.ops[0];
};

const getAll = async () => 
  connection()
    .then((db) => db.collection('sales').find().toArray());

const getSaleById = async (id) => {
  const result = await connection()
    .then((db) => db.collection('sales').findOne(ObjectId(id)));
  return result;
};

const updateById = async (id, array) =>
  connection().then(async (db) => {
    const sales = await db
      .collection('sales')
      .updateOne({ _id: ObjectId(id) }, { $set: { itensSold: [...array] } });
    return getSaleById(id);
  });
 
const deleteSale = async (id) =>
  connection().then((db) => db.collection('sales').deleteOne({ _id: ObjectId(id) }));

module.exports = {
  addSales,
  getAll,
  updateById,
  getSaleById,
  deleteSale,
};
