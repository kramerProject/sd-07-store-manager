const conn = require('../config/conn');
const { ObjectId } = require('mongodb');

const addProduct = async (name, quantity) => conn()
  .then(async (db) => {
    const product = await db.collection('products').insertOne({name, quantity});
    return product.ops[0];
  });

const getAllProducts = async () => conn()
  .then((db) => db.collection('products').find().toArray());

const getProductByName = async (name) => conn()
  .then((db) => db.collection('products').findOne({name}));

const getProductById = async (id) => conn()
  .then((db) => db.collection('products').findOne({_id: ObjectId(id)}));

const updateProduct = async (id, name, quantity) => conn()
  .then(async (db) => {
    const product = await db.collection('products').updateOne(
      { _id: ObjectId(id) },
      { $set: {name, quantity}}
    );
    return ({ _id: id, name, quantity });
  });

const deleteProduct = async (id) => conn()
  .then(async (db) => {
    const deletedProduct = await getProductById(id);
    await db.collection('products').deleteOne({_id: ObjectId(id)});
    return deletedProduct;
  });

module.exports = {
  addProduct,
  getProductById,
  getProductByName,
  getAllProducts,
  updateProduct,
  deleteProduct,
};