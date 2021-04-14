const { response } = require('express');
const connect = require('../db');
const { ObjectId } = require('mongodb');

const insertSale = async (sale) => {
  return connect()
    .then(db => db.collection('sales')
      .insertOne({itensSold: sale}))
    .then(result => result.ops)
    .catch(error => console.log(error));
};

module.exports = {
  insertSale,
};