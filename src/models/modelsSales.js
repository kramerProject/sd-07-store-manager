const { ObjectId } = require('mongodb');
const connection = require('./database/connection');

const create = async (sale) =>
  await connection()
    .then((db) => db.collection('sales').insertOne({ itensSold: sale }))
    .then((result) => ({ _id: result.insertedId, itensSold: sale }));

const getAll = async () =>
  await connection()
    .then((db) => db.collection('sales'))
    .then((sales) => sales.find().toArray());

const getById = async (id) =>
  await connection()
    .then((db) => db.collection('sales'))
    .then((sales) => sales.findOne(ObjectId(id)));

const updateById = async (id, sale) =>
  await connection()
    .then((db) => db.collection('sales'))
    .then((sales) => sales.updateOne(
      { _id: ObjectId(id) },
      { $set: { itensSold: sale } }
    ));

const excludeById = async (id) =>
  connection()
    .then((db) => db.collection('sales'))
    .then((sale) => sale.findOneAndDelete({ _id: ObjectId(id) }))
    .then((excludedSale) => excludedSale.value);

module.exports = {
  create,
  getAll,
  getById,
  updateById,
  excludeById
};
