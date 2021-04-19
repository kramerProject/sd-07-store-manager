const connection = require('../config/connection');
const { ObjectId } = require('mongodb');

const getAll = async () => {
  return connection().then((db) => db.collection('sales').find().toArray());
};

const createSale = async (product) => {
  return connection()
    .then((db) => db.collection('sales').insertOne({ itensSold: [...product] }))
    .then((result) => result.ops[0]);
};

const getById = async (id) => {
  return connection()
    .then((db) => db.collection('sales').findOne(ObjectId(id)))
    .catch((err) => err);
};

const updateSale = async (id, product) => {
  return connection().then((db) =>
    db
      .collection('sales')
      .findOneAndUpdate(
        { _id: ObjectId(id) },
        {$set: { itensSold: [...product] }},
        { returnOriginal: false },
      ),
  )
    .then(response => response.value);
};

const deleteSale = async (id) => {
  return connection()
    .then((db) => db.collection('sales').findOneAndDelete({_id: ObjectId(id)}))
    .then(response => response.value)
    .catch(error => console.log(error.message));
};

module.exports = {
  getAll,
  createSale,
  getById,
  updateSale,
  deleteSale
};
