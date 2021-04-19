const { ObjectId } = require('mongodb');
const connection = require('./database/connection');

const getByName = async (name) =>
  await connection()
    .then((db) => db.collection('products'))
    .then((products) => products.findOne({ name }));

// using return
const create = async (name, quantity) => {
  const productNew = await connection()
    .then((db) => db.collection('products').insertOne({ name, quantity }));
  return productNew.ops[0];
};

const getAll = async () =>
  await connection()
    .then((db) => db.collection('products'))
    .then((products) => products.find().toArray());

const getById = async (id) =>
  await connection()
    .then((db) => db.collection('products'))
    // .then(console.log('modelsgetById'))
    .then((products) => products.findOne(ObjectId(id)));

// const getById = async (id) => {
//   const productsById = await connection()
//     .then((db) => db.collection('products')).findOne(ObjectId(id));
//   console.log("model");
//   return productsById;
// };

const updateById = async (id, name, quantity) =>
  await connection()
    .then((db) => db.collection('products'))
    .then((products) => products.updateOne(
      { _id: ObjectId(id) },
      { $set: { name, quantity } }
    ));

// using return
const excludeById = async (id) => {
  const excludedProd = await connection()
    .then((db) => db.collection('products'))
    // .then(console.log('modelsexcludeByid'))
    .then((product) => product.findOneAndDelete({ _id: ObjectId(id) }));
  return excludedProd;
};

module.exports = {
  getByName,
  create,
  getAll,
  getById,
  updateById,
  excludeById
};
