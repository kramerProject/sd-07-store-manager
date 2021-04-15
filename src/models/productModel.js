const connection = require('../../config/connection');
const { ObjectId } = require('mongodb');

const getAllProducts = async () =>
  connection()
    .then((db) =>
      db.collection('products')
        .find().toArray());

const createProduct = async (name, quantity) => {
  const product = await connection()
    .then((db) =>
      db.collection('products')
        .insertOne({ name, quantity })
    );
  return { _id: product.insertedId, name, quantity };
};

const countByNameDuplicate = async (name) => {
  const product = await connection()
    .then((db) =>
      db.collection('products')
        .countDocuments({ 'name': name }));
  return product;
};

const getProductById = async (id) => {
  if(!ObjectId.isValid(id)) {
    return null;
  }
  return connection()
    .then((db) =>
      db.collection('products')
        .findOne(ObjectId(id))
    );
};


module.exports = {
  getAllProducts,
  createProduct,
  countByNameDuplicate,
  getProductById,
};
