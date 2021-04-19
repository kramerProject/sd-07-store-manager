const connect = require('../../config/conn');
const { ObjectId } = require('mongodb');

const COLLECTION_NAME = 'products';

const getAll = async () => connect()
  .then((db) => db.collection(COLLECTION_NAME).find().toArray());

const getById = async (id) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  return connect().then((db) => db.collection(COLLECTION_NAME).findOne(ObjectId(id)));
};

const getByName = async (name) => {
  return connection().then((db) => db.collection(COLLECTION_NAME).findOne({ name }));
};

const add = async (name, quantity) =>
  connect().then(async (db) => {
    const product = await db.collection(COLLECTION_NAME).insertOne({ name, quantity });
    return product.ops[0];
  });

const update = async (id, name, quantity) =>
  connect().then(async (db) => {
    const product = await db
      .collection(COLLECTION_NAME)
      .updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } });
    return { _id: id, name, quantity };
  });

const updateQuantity = async (id, quantity) =>
  connect().then(async (db) => {
    const product = await db
      .collection(COLLECTION_NAME)
      .updateOne({ _id: ObjectId(id) }, { $set: { quantity } });
    return { _id: id, quantity };
  });

const exclude = async (id) =>
  connect()
    .then(async (db) => db.collection(COLLECTION_NAME).deleteOne({ _id: ObjectId(id) }));

module.exports = {
  getAll,
  getById,
  getByName,
  add,
  update,
  updateQuantity,
  exclude,
};
