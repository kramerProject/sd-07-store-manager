const { ObjectId } = require('mongodb');
const connection = require('./database/connection');

const getByName = async (name) =>
  await connection()
    .then((db) => db.collection('products'))
    .then((products) => products.findOne({ name }));

const create = async (name, quantity) => {
  const productNew = await connection()
    .then((db) => db.collection('products').insertOne({ name, quantity }));
  return productNew;
};

/* const getAll = async () =>
  await connection()
    .then((db) => db.collection('products'))
    .then((products) => products.find().toArray());

const getById = async (id) =>
  await connection()
    .then((db) => db.collection('products'))
    .then((products) => products.findOne(ObjectId(id)));

const updateById = async (id, name, quantity) =>
  await connection()
    .then((db) => db.collection('products'))
    .then((products) => products.updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } }));

const excludeById = async (id) =>
  await connection()
    .then((db) => db.collection('products'))
    .then((product) => product.findOneAndDelete({ _id: ObjectId(id) }))
    .then((excludedProd) => excludedProd.value); */

module.exports = {
  getByName,
  create
  /* getAll,
  getById,
  updateById,
  excludeById */
};
