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

const updateSale = async (id, sale) => {
  await connection()
    .then((db) => db.collection('sales')
      .updateOne({_id: ObjectId(id)}, {$set: {itensSold: sale}}));

  return {
    _id: id,
    itensSold: sale
  };
};

/*
const searchProduct = async (name) => await connection()
  .then((db) => db.collection('products')
    .findOne({name}));



const deleteProduct = async (id) =>
  await connection()
    .then((db) => db.collection('products')
      .deleteOne({_id: ObjectId(id)}));
*/

module.exports = {
  createNewSale,
  getAllSales,
  findBySaleId,
  updateSale,
};
