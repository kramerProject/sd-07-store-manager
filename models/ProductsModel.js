const connection = require('../config/connections');
const { ObjectId } = require('mongodb');

const findProductByName = async (name) => {
  const existsProduct = await connection().then((db) =>
    db.collection('products').findOne({ name }),
  );
  return existsProduct;
};

const createProducts = async (name, quantity) => {
  const newProduct = await connection().then((db) =>
    db.collection('products').insertOne({ name, quantity }),
  );
  return { _id: newProduct.insertedId, name, quantity };
};

const getAllProducts = async () =>
  connection().then((db) => db.collection('products').find().toArray());

const getProductById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  return connection().then((db) => db.collection('products').findOne(ObjectId(id)));
};

const updateProduct = async (id, name, quantity) => {
  const updatedProduct = await connection().then((db) =>
    db.collection('products')
      .updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } }),
  );
  return { _id: id, name, quantity };
};

module.exports = {
  createProducts,
  findProductByName,
  getAllProducts,
  getProductById,
  updateProduct,
};
