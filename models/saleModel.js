const connect = require('../configuration/connection');
const { ObjectId } = require('mongodb');

const getAll = async () => {
  const sales = await connect().then((db) =>
    db.collection('sales').find().toArray());
  return { sales: sales };
};

const add = async (sale) => {
  const saleResult = await connect().then((db) =>
    db.collection('sales').insertOne({ itensSold: sale }));
  return saleResult.ops[0];
};

const getById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const sale = await connect().then((db) =>
    db.collection('sales').findOne(ObjectId(id)));
  return sale;
};

const update = async (updateData) => {
  await connect().then((db) =>
    db.collection('sales').updateOne(
      {_id: ObjectId(updateData._id)},
      { $set: { itensSold: updateData.itensSold } }
    ));
  return updateData;
};

const deleteOneSale = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const sale = await connect().then((db) =>
    db.collection('sales').findOne(ObjectId(id)));
  await connect().then((db) =>
    db.collection('sales').deleteOne({ _id: ObjectId(id) }));
  return sale;
};

module.exports = {
  add,
  getAll,
  getById,
  update,
  deleteOneSale
};