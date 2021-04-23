const connect = require('../config/connect');
const ObjectId = require('mongodb').ObjectId;

const createSale = async(product) => {
  return connect().then(db => db.collection('sales')
    .insertOne({itensSold: [...product]}))
    .catch(err => console.log(err.message));
};

const getSaleById = async (id) => {
  connect().then(db => db.collection('sales')
    .findOne({_id: ObjectId(id)}))
    .catch(err => console.log(err.message));
};

const getSale = async () => {
  return connect().then(db => db.collection('sales')
    .find().toArray())
    .catch(err => console.log(err.message));
};

const updateSalesById = async (id, sale) => {
  connect().then(db => db.collection('sales')
    .findOneAndUpdate(
      {_id: ObjectId(id)},
      {$set: { itensSold: sale }},
      {returnOriginal: false}))
    .catch(err => console.log(err.message));
};

const deleteSalesById = async (id) => {
  connect().then(db => db.collection('sales')
    .findOneAndDelete({_id: ObjectId(id)}))
    .then(response => response.value)
    .catch(err => console.log(err.message));
};

module.exports = {
  createSale,
  getSale,
  getSaleById,
  updateSalesById,
  deleteSalesById,
};