const connection = require('../config/connection');

const addProduct = async (name, quantity) => {
  const checkNameExistis = await connection()
    .then((db) => db.collection('products').findOne({ name: name }));
  if (checkNameExistis) return null;
  const result = await connection()
    .then((db) => db.collection('products').insertOne({ name, quantity }));
  return {
    _id: result.insertedId,
    name,
    quantity,
  };
};

module.exports = {
  addProduct,
};