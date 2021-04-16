const connect = require('../../config/conn');
const { ObjectId } = require('mongodb');

const COLLECTION_NAME = 'sales';

const getAll = async () => connect()
  .then((db) => db.collection(COLLECTION_NAME).find().toArray());

const getById = async (id) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  return connect().then((db) => db.collection(COLLECTION_NAME).findOne(ObjectId(id)));
};

const add = async ( itensSold ) =>
  connect().then(async (db) => {
    const sale = await db.collection(COLLECTION_NAME).insertOne({ itensSold });
    return sale.ops[0];
  });

const update = async (id, itensSold) =>
  connect().then(async (db) => {
    const sale = await db
      .collection(COLLECTION_NAME)
      .updateOne({ _id: ObjectId(id) }, { $set: { itensSold } });
    return { _id: id, itensSold };
  });

const exclude = async (id) =>
  connect()
    .then(async (db) => db.collection(COLLECTION_NAME).deleteOne({ _id: ObjectId(id) }));

module.exports = {
  getAll,
  getById,
  add,
  update,
  exclude,
};
