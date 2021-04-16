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
    


module.exports = {	
  create,
  getAll,
  getById,
};