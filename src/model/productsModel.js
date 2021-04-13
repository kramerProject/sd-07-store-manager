const { ObjectID } = require('mongodb');
const { MongoClient } = require('mongodb');

const MONGO_DB_URL = 'mongodb://172.17.0.1:27017';
const DB_NAME = 'StoreManager';

const connection = () => MongoClient
  .connect(MONGO_DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((conn) => conn.db(DB_NAME))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });

const create = async (name, quantity) => connection()
  .then((db) => db.collection('products').insertOne({ name, quantity }))
  .then((result) => ({
    _id: result.insertedId,
    name,
    quantity,
  }));

const getAll = async () => connection()
  .then((db) => db.collection('products').find().toArray());

const getById = async (id) => connection()
  .then((db) => db.collection('products').find(ObjectID(id)).toArray())
  .then((data) => data[0]);

const editById = async (id, name, quantity) => connection()
  .then((db) => db.collection('products').findOneAndUpdate(
    { _id: ObjectID(id) }, { $set: { name, quantity } }
  ));

const deleteById = async (id) => connection()
  .then((db) => db.collection('products').findOneAndDelete({ _id: ObjectID(id) }))
  .then((responseDelete) => responseDelete.value);

module.exports = { getAll, create, getById, editById, deleteById };
