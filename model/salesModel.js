const connection = require('../config/connection');
const { ObjectId } = require('mongodb');

const insert = async (itensSold) => {
  return connection()
    .then((db) => db.collection('sales').insertOne({ itensSold }));
};

const getAll = async () => {
  return connection().then((db) => db.collection('sales').find().toArray());
};

const findById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  return connection().then((db) => db.collection('sales').findOne(ObjectId(id)));
};

const update = async (id, itensSold) => 
  connection().then(async (db) => {
	  await db.collection('sales')
	  	.updateOne({ _id: ObjectId(id) }, { $set: { itensSold } });
    return { _id: id, itensSold };
  });

const deleteSale = async (id) =>
  connection().then(async (db) =>
    db.collection('sales').deleteOne({ _id: ObjectId(id) })
  );

module.exports = {
  insert,
  getAll,
  findById,
  update,
  deleteSale,
};