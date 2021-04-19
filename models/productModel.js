const { ObjectId } = require('bson');
const connection = require('./connection');


const createNewProduct = async (name, quantity ) => await connection()
  .then((db) => db.collection('products')
    .insertOne({name, quantity}));

const searchProduct = async (name) => await connection()
  .then((db) => db.collection('products')
    .findOne({name}));

const getAllProducts = async () => await connection()
  .then((db) => db.collection('products')
    .find().toArray());

const findByProductId = async (id) => await connection()
  .then((db) => db.collection('products')
    .findOne(ObjectId(id)));

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
module.exports = {
  createNewProduct,
  searchProduct,
  getAllProducts,
  findByProductId,
  updateProduct,
};
