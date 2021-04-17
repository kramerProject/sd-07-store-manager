const connection = require('../config/conn');
const { ObjectId } = require('mongodb');

const create = async (name, quantity) => {
  const product = await connection().then((db) =>
    db.collection('products').insertOne({ name, quantity })
  );

  return { _id: product.insertedId, name, quantity };
};

const getAll = async () => 
  connection().then((db) => 
    db.collection('products').find().toArray());

const getById = async (id) => {
  return connection().then((db) => 
    db.collection('products').findOne({ _id: ObjectId(id) }));
};

const update = async ({ id, name, quantity }) => {
  if (!ObjectId.isValid(id)) return null;

  const product = await connection().then((db) =>
    db
      .collection('products')
      .updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } })
  );
  return product;
};

    


module.exports = {	
  create,
  getAll,
  getById,
  update
};