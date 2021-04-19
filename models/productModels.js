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
  return { _id: result._id, name, quantity };
};

const getAll = async () => {
  const response = await connection()
    .then((db) => db.collection('products').find().toArray());
  
  if (response === null) throw new Error('Banco de dados vazio.');
  return response;
};

const getById = async (id) => {
  if (ObjectId.isValid(id) === false) throw new Error('Wrong id format');
  
  return connection().then((db) => db.collection('products')
    .findOne(ObjectId(id)));
};

const updateById = async (id, name, quantity) => {
  const validationsFail = await validationFail(name, quantity);
  if (validationsFail != undefined) throw new Error(validationsFail);
  
  await connection().then((db) => db.collection('products')
    .updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } }));
  return { _id: ObjectId(id), name, quantity };
};

module.exports = { createProducts, getAll, getById, updateById };
