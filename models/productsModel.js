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

module.exports = {
  create,
  getByName,
};
