const connection = require('../config/connection');
const { ObjectId } = require('mongodb');

const getAll = async () => {
  return connection().then((db) => db.collection('products').find().toArray());
};

const createProduct = async (name, quantity) => {
  return connection()
    .then((db) => db.collection('products').insertOne({ name, quantity }))
    .then((result) => result.ops);
};

const getById = async (id) => {
  return connection()
    .then((db) => db.collection('products').findOne(ObjectId(id)))
    .catch((err) => err);
};

const updateProduct = async (id, name, quantity) => {
  if (!ObjectId.isValid(id)) return null;
  const result = await connection().then((db) =>
    db.collection('products').findOne(new ObjectId(id)),
  );
  if (!result) return null;
  await connection().then((db) =>
    db.collection('products').updateOne(
      { _id: ObjectId(id) },
      {
        $set: {
          name: name,
          quantity: quantity,
        },
      },
    ),
  );
  return {
    _id: id,
    name,
    quantity,
  };
};

const deleteProduct = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const result = await connection().then((db) =>
    db.collection('products').findOne(new ObjectId(id)),
  );
  if (!result) return null;
  await connection().then((db) => db
  .collection('products')
  .deleteOne({ _id: ObjectId(id) }));

  return result;
};

module.exports = {
  getAll,
  createProduct,
  getById,
  updateProduct,
  deleteProduct,
};
