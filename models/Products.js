const connection = require('./connections');
const { ObjectId } = require('mongodb');

const createProducts = async (name, quantity) => {
  console.log(name, quantity);
  const newProduct = await connection()
    .then((db) =>
      db.collection('products').insertOne({name, quantity})
    );

  return { _id: newProduct.insertedId, name, quantity};
};

module.exports = {
  createProducts,
};