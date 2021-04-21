const connection = require('../config/conn');

const { ObjectId } = require('mongodb');

const PRODUCTS = 'products';

const getAll = async () => {
  return connection().then(db => db.collection(PRODUCTS).find({}).toArray());
};

const getById = async (id) => {
  if(!ObjectId.isValid(id)) {
    return null;
  }
  return connection().then(db =>
    db.collection(PRODUCTS).findOne(ObjectId(id))
  );
};

const create = async ({name, quantity}) => {
  const product = await connection().then(db =>
    db.collection(PRODUCTS).insertOne({ name, quantity })
  );
  return { _id: product.insertedId, name, quantity };
};

const update = async ({id, name, quantity}) => {
  if(!ObjectId.isValid(id)) return null;
  
  const product = await connection().then((db) => db
    .collection(PRODUCTS)
    .updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } })
  );
  return product;
};

const exclude = async (id) => {
  if(!ObjectId.isValid(id)) return null;

  return connection().then((db) => db
    .collection(PRODUCTS)
    .deleteOne({ _id: ObjectId(id) })
  );
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  exclude
};
