const connect = require('../config/connect');
const ObjectId = require('mongodb').ObjectId;

const createSale = async(product) => {
  return connect().then(db => db.collection('sales').insertOne({itensSold: [...product]}))
    .catch(error => console.error(error.message));
};

const getSale = async () => {
  return connect().then(db => db.collection('sales').find().toArray())
    .catch(error => console.error(error.message));
};

const getSaleById = async (id) => {
  return connect().then(db => db.collection('sales').findOne({_id: ObjectId(id)}))
    .catch(error => console.error(error.message));
};

const updateSalesById = async (id, sale) => {
  return connect().then(db => db.collection('sales').findOneAndUpdate({_id: ObjectId(id)},
    {$set: { itensSold: sale }},
    {returnOriginal: false}))
    .catch(error => console.error(error.message));
};

const deleteSalesById = async (id) => {
  return connect().then(db => db.collection('sales')
    .findOneAndDelete({_id: ObjectId(id)}))
    .then(response => response.value)
    .catch(error => console.error(error.message));
};

module.exports = {
  createSale,
  getSale,
  getSaleById,
  updateSalesById,
  deleteSalesById,
};