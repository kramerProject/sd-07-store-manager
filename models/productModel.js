const connection = require('../config/conn');

const { ObjectId } = require('mongodb');

const getAll = async () => {
  return connection()
    .then((db) => db.collection('products').find().toArray());
};

const getById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  return connection().then((db) => db.collection('products').findOne(ObjectId(id)));
};
    
const createProduct = async (name, quantity) => {
  const product = await connection().then((db) =>
    db.collection('products').insertOne({ name, quantity })
  );

  return { _id: product.insertedId, name, quantity };
};

module.exports = {
  getAll,
  getById,
  createProduct
};
