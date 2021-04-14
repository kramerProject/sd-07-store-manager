const { response } = require('express');
const connect = require('../db');
const { ObjectId } = require('mongodb');

const insertSale = async (sale) => {
  return connect()
    .then(db => db.collection('sales')
      .insertOne({itensSold: sale}))
    .then(result => result.ops)
    .catch(error => console.log(error +  ' in insertsales'));
};

const updateOne = async (id ,sale) => {
  return connect()
    .then(db => db.collection('sales')
      .updateOne({ _id: ObjectId(id) }, { $set: { itensSold: sale } })
      .then(result => result));
};

const getAll = async () => {
  return connect()
    .then(db => db.collection('sales')
      .find().toArray().then(response => response))
    .catch(error => console.log(error.message));
};

const getBySaleId = async (id) => {
  return connect()
    .then(db => db.collection('sales')
      .findOne({_id: ObjectId(id)})
      .then(response => response))
    .catch(error => console.log(error.message));
};

const deleteOne = async (id) => {
  connect()
    .then((db) => db.collection('sales').findOneAndDelete({ _id: ObjectId(id) }))
    .then((responseDelete) => responseDelete.value);
};

module.exports = {
  insertSale,
  getAll,
  getBySaleId,
  updateOne,
  deleteOne
};