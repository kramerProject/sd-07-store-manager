const { ObjectId } = require('bson');
const connection = require('./connection');


const createNewSale = async (sales) => await connection()
  .then((db) => db.collection('sales')
    .insertOne({itensSold:sales}));


const getAllSales = async () => await connection()
  .then((db) => db.collection('sales')
    .find().toArray());

const findBySaleId = async (id) => await connection()
  .then((db) => db.collection('sales')
    .findOne(ObjectId(id)));

/*
const searchProduct = async (name) => await connection()
  .then((db) => db.collection('products')
    .findOne({name}));

const getAllProducts = async () => await connection()
  .then((db) => db.collection('products')
    .find().toArray());

const updateProduct = async (id, name, quantity) => {
  await connection()
    .then((db) => db.collection('products')
      .updateOne({_id: ObjectId(id)}, {$set: {name: name, quantity: quantity}}));

  return {
    _id: id,
    name,
    quantity
  };
};

const deleteProduct = async (id) =>
  await connection()
    .then((db) => db.collection('products')
      .deleteOne({_id: ObjectId(id)}));
*/

module.exports = {
  createNewSale,
  getAllSales,
  findBySaleId,
};
