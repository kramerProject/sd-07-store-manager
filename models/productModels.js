const connection = require('../config/conn');
const { ObjectId } = require('mongodb');



const validationFail = (name, quantity, nameOfProduct) => {
  if(name.length < 5) return '"name" length must be at least 5 characters long';
  if (nameOfProduct) return 'Product already exists';
};

const createProducts = async (name, quantity) => {
  const nameOfProduct = await connection()
    .then((db) => db.collection('products').find({ name }));

  const validationsFail = await validationFail(name, quantity, nameOfProduct);
  if (validationsFail !== undefined) throw new Error(validationsFail);

  const result = await connection()
    .then((db) => db.collection('products').insertOne({ name, quantity }))
    .then(response => response.ops[0]);
  return result;
};

module.exports = { createProducts };
