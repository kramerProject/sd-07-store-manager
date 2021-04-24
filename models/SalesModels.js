const connect = require('../config/connect');
// const ObjectId = require('mongodb').ObjectId;

const createSale = async(product) => {
  return connect().then(db => db.collection('sales')
    .insertOne({itensSold: [...product]}))
    .catch(err => console.log(err.message));
};

const getSaleById = async (id) => {
  return connect().then(db => db.collection('sales')
    .findOne({_id: id}))
    // .findOne({_id: ObjectId(id)}))
    .catch(err => console.log(err));
};

const getSale = async () => {
  return connect().then(db => db.collection('sales')
    .find().toArray())
    .catch(err => console.log(err));
};

const updateSalesById = async (id, sale) => {
  return connect().then(db => db.collection('sales')
    .findOneAndUpdate(
      {_id: id},
      // {_id: ObjectId(id)},
      {$set: { itensSold: sale }},
      {returnOriginal: false}))
    .catch(err => console.log(err));
};

const deleteSalesById = async (id) => {
  return connect().then(db => db.collection('sales')
    // .findOneAndDelete({_id: ObjectId(id)}))
    .findOneAndDelete({_id: id}))
    .then(response => response.value)
    .catch(err => console.log(err));
};

module.exports = {
  createSale,
  getSale,
  getSaleById,
  updateSalesById,
  deleteSalesById,
};