const connection = require('../../config/conn');

const { ObjectId } = require('mongodb');

const getByName = async (name) => {
  const productFoundByName = await connection().then(db =>
    db.collection('products').findOne({ name }));
  return productFoundByName;
};

const create = async (name, quantity) => {
  const product = await connection()
    .then(db => db.collection('products').insertOne({ name, quantity }));
  return product.ops[0];
};

const getAll = async () => {
  return await connection()
    .then(db => db.collection('products').find().toArray());
};

const getById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  return await connection().then(db => 
    db.collection('products').findOne(ObjectId(id))
  );
};

const update = async (id, name, quantity) => {
  const productUpdated = await connection().then(db =>
    db.collection('products')
      .updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } }));
  return {_id: id, name, quantity};
};

const exclude = async (id) => {
  return await connection().then(db => {
    db.collection('products').deleteOne({ _id: ObjectId(id) });
  });
};

module.exports = {
  create,
  getByName,
  getAll,
  getById,
  update,
  exclude
};