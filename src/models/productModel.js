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

const updateProduct = async ({ id, name, quantity }) => {
  if(!ObjectId.isValid(id)) {
    return null;
  }
  const product = await connection()
    .then((db) =>
      db.collection('products')
        .updateOne({ _id: ObjectId(id)}, { $set: { name, quantity } })
    );
  return product;
};


module.exports = {
  getAllProducts,
  createProduct,
  countByNameDuplicate,
  getProductById,
  updateProduct,
};
