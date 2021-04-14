const connection = require('../config/conn');
const { ObjectId } = require('mongodb');

const create = async (name, quantity) =>
  connection().then(async (db) => {
    const product = await db.collection('products')
      .insertOne({ name, quantity });

    return product.ops[0];
  });

const getByName = async (name) => {
  try {
    const product = await connection().then((db) =>
      db.collection('products')
        .findOne({ name }),
    );
    return product;
  } catch (err) {
    console.error(err);
    return { err };
  }
};

const getAll = async () =>
  connection().then(async (db) => {
    const products = await db.collection('products')
      .find().toArray();
    return {products};
  });

const getById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const product = await connection().then((db) =>
    db.collection('products')
      .findOne(ObjectId(id)),
  );
  return product;
};

module.exports = {
  create,
  getByName,
  getAll,
  getById,
};
