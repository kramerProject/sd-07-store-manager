const connection = require('../config/conn');

const addProductModel = async(name, quantity) => {
  const product = await connection().then((db) =>
    db.collection('products').insertOne({ name, quantity }));
  return product.ops[0];
  // const db = await connection();
  // const product = await db.collection('products').insertOne({ name, quantity });
  // return product.ops[0];
};

const getAllProductsModel = async() => {
  const db = await connection();
  return await db.collection('products').find().toArray();
};

module.exports = { addProductModel, getAllProductsModel };
