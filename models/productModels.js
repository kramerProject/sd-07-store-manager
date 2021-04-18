const connection = require('../config/conn');
const { ObjectId } = require('mongodb');



const validationFail = (name, quantity, nameOfProduct) => {
  const minLengthName = 5;
  const minQuantity = 0;

  if (quantity <= minQuantity) return '"quantity" must be larger than or equal to 1';
  if (typeof(quantity) !== 'number') return '"quantity" must be a number';

  if (nameOfProduct) return 'Product already exists';
  if(name.length < minLengthName) {
    return '"name" length must be at least 5 characters long';
  };

  return undefined;
};

const createProducts = async (name, quantity) => {
  const nameOfProduct = await connection()
    .then((db) => db.collection('products').findOne({ name }));

  const validationsFail = await validationFail(name, quantity, nameOfProduct);
  if (validationsFail != undefined) throw new Error(validationsFail);

  const result = await connection()
    .then((db) => db.collection('products').insertOne({ name, quantity }))
    .then(response => response.ops[0]);
  return result;
};

module.exports = { createProducts };
