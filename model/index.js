const connection = require('../config/connection');
const { ObjectId } = require('mongodb');

const insert = async (collection, data) => {
  return connection()
    .then((db) => db.collection(collection).insertOne(data));
};

const getAll = async (collection) => {
  return connection().then((db) => db.collection(collection).find().toArray());
};

const findById = async (collection, id) => {
  if (!ObjectId.isValid(id)) return null;

  return connection().then((db) => db.collection(collection).findOne(ObjectId(id)));
};

const update = async (collection, id, data) => 
  connection().then(async (db) => {
	  await db.collection(collection)
	  	.updateOne({ _id: ObjectId(id) }, { $set: data });
    return { _id: id, ...data };
  });

const deleteOne = async (collection, id) =>
  connection().then(async (db) =>
    db.collection(collection).deleteOne({ _id: ObjectId(id) })
  );

module.exports = {
  insert,
  getAll,
  findById,
  update,
  deleteOne,
};
