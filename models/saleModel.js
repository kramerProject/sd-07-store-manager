const connection = require('../config/conn');
const { ObjectId } = require('mongodb');

const create = async (salesArr) => {
  const sale = await connection().then((db) =>
    db.collection('sales').insertOne({ itensSold: salesArr }));

  return {
    _id: sale.insertedId,
    itensSold: salesArr,
  };
};

const getAll = () => connection().then((db) => db.collection('sales').find().toArray());

const getById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const sale = connection()
    .then((db) => db.collection('sales').findOne(ObjectId(id)));
  return sale;
};

const update = async (id, itensSold) =>  {
  if (!ObjectId.isValid(id)) return null;
  
  await connection().then((db) => db.collection('sales')
    .updateOne(
      { _id: ObjectId(id) },
      { $set: { itensSold } }));

  return {
    _id: id,
    itensSold
  };
};

const exclude = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  return await connection().then(
    async (db) => await db.collection('sales').deleteOne({_id: ObjectId(id)})
  );  
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  exclude,
};
