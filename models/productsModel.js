const connection = require('../config/connection');
const { ObjectId } = require('mongodb');

const insertProduct = async (name, quantity) => {
  const product = await connection().then((db) =>
    db.collection('products').insertOne({ name, quantity })
  );

  return {_id: product.insertedId, name, quantity };
};

const findAll = async () =>
  connection()
    .then((db) => db.collection('products').find().toArray());

const findId = async (id) => {
  const result = await connection().then((db) =>
    db.collection('products').findOne(ObjectId(id))
  );
  return result;
};

const updateProduct = async (id, name, quantity) =>
  connection().then(async (db) => {
    const product = await db
      .collection('products')
      .updateOne({
        _id: ObjectId(id) }, { $set: { name, quantity }
      });
    return { _id: id, name, quantity };
  });

module.exports = {
  insertProduct,
  findAll,
  findId,
  updateProduct,
};

