const connection = require('./connection');

const create = async (itenSold) =>
  connection()
    .then ((db) => db.collection('sales').insertOne ({itenSold}));

const getAll = async () => 
  connection() 
    .then ((db) => db.collection('sales').find());

module.exports  = { create, getAll };   