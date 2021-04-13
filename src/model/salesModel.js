const { ObjectID } = require('mongodb');
const { MongoClient } = require('mongodb');

const MONGO_DB_URL = 'mongodb://172.17.0.2:27017';
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

const create = async (sale) => connection()
  .then((db) => db.collection('sales').insertOne({ itensSold: sale }))
  .then((result) => ({
    _id: result.insertedId,
    itensSold: sale,
  }));

const getAll = async () => connection()
  .then((db) => db.collection('sales').find().toArray());

const getById = async (id) => connection()
  .then((db) => db.collection('sales').find(ObjectID(id)).toArray())
  .then((data) => data[0]);

const editById = async (id, newSale) => connection()
  .then((db) => db.collection('sales').findOneAndUpdate({ _id: ObjectID(id) }, { $set: { itensSold: newSale } }))
  .then((responseDelete) => responseDelete.value);

const deleteById = async (id) => connection()
  .then((db) => db.collection('sales').findOneAndDelete({ _id: ObjectID(id) }))
  .then((responseDelete) => responseDelete.value);

module.exports = { create, getById, getAll, editById, deleteById };
