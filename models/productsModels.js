const connection = require('../config/conn');
const { ObjectId } = require('mongodb');

const getAll = async () =>
  connection()
    .then((db) => db.collection('products').find().toArray());

const addProduct = async (name, quantity) => {
  const product = await connection().then((db) => 
    db.collection('products').insertOne({ name, quantity })
  );

  return { _id: product.insertedId, name, quantity };
};

const getByProductId = async (id) => {
  //if (!ObjectID.isValid(id)) return null;
  const result = await connection().then((db) =>
    db.collection('products').findOne(ObjectId(id))
  );
  return result;
};

module.exports = {
  getAll,
  addProduct,
  getByProductId,
};
