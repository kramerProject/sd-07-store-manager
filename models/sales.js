const connection = require('./connection');
const { ObjectId } = require('mongodb');

const SALES_COLLECTION = 'sales';

const createSale = (productArray) => {
  return connection()
    .then((db) => db.collection(SALES_COLLECTION).insertOne({
      itensSold: productArray,
    }))
    .then((result) => ({
      _id: result.insertedId,
      itensSold: productArray,
    }));
};

// const findByName = (name) => {
//   return connection()
//     .then((db) => db.collection(PRODUCTS_COLLECTION).find({ name: name }).toArray());
// };

const findById = (id) => {
  return connection()
    .then((db) => db.collection(SALES_COLLECTION).findOne({_id: ObjectId(id) }));
};

const getAll = () => {
  return connection()
    .then((db) => db.collection(SALES_COLLECTION).find().toArray())
    .then((result) => ({
      sales: result,
    }));
};

// const updateProduct = (id, product) => {
//   return connection()
//     .then((db) => db.collection(PRODUCTS_COLLECTION).updateOne(
//       {_id: ObjectId(id)},
//       {
//         $set: {
//           name: product.name,
//           quantity: product.quantity,
//         }
//       }
//     ))
//     .then((result) => ({
//       _id: result.insertedId,
//       name: product.name,
//       quantity: product.quantity,
//     }));
// };

// const deleteProduct = (id) => {
//   return connection()
//     .then((db) => db.collection(PRODUCTS_COLLECTION).deleteOne({_id: ObjectId(id)}));
// };

module.exports = {
  createSale,
  // findByName,
  findById,
  getAll,
  // updateProduct,
  // deleteProduct,
};
