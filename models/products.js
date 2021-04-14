const connection = require('./connection');
const { ObjectId } = require('mongodb');

const PRODUCTS_COLLECTION = 'products';

const createProduct = ({name, quantity}) => {
  return connection()
    .then((db) => db.collection(PRODUCTS_COLLECTION).insertOne({
      name,
      quantity,
    }))
    .then((result) => ({
      _id: result.insertedId,
      name,
      quantity,
    }));
};

const findByName = (name) => {
  return connection()
    .then((db) => db.collection(PRODUCTS_COLLECTION).find({ name: name }).toArray());
};

const findById = (id) => {
  return connection()
    .then((db) => db.collection(PRODUCTS_COLLECTION).findOne({_id: ObjectId(id) }));
};

const getAll = () => {
  return connection()
    .then((db) => db.collection(PRODUCTS_COLLECTION).find().toArray())
    .then((result) => ({
      products: result,
    }));
};

const updateProduct = (id, product) => {
  return connection()
    .then((db) => db.collection(PRODUCTS_COLLECTION).updateOne(
      {_id: ObjectId(id)},
      {
        $set: {
          name: product.name,
          quantity: product.quantity,
        }
      }
    ))
    .then((result) => ({
      _id: result.insertedId,
      name: product.name,
      quantity: product.quantity,
    }));
};

const deleteProduct = (id) => {
  return connection()
    .then((db) => db.collection(PRODUCTS_COLLECTION).deleteOne({_id: ObjectId(id)}));
};

module.exports = {
  createProduct,
  findByName,
  findById,
  getAll,
  updateProduct,
  deleteProduct,
};
