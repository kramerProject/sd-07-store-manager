const connection = require('../config/conn');
const { ObjectId } = require('mongodb');

/* const create = async (firstName, middleName, lastName) =>
connection()
    .then((db) =>
    db.collection('authors').insertOne({ firstName, middleName, lastName })
    ).then((result) => result);
 */
const create = async ({ name, quantity }) => {
  const db = await connection();
  const { insertedId } = await db.collection('products').insertOne({ name, quantity });
  return insertedId;
};

const update = async (id, { name, quantity }) => {
  const db = await connection();
  const { result } = await db.collection('products').updateOne(
    {
      '_id': ObjectId(id) },
    {
      $set: {
        'name': name,
        'quantity': quantity,
      },
    }
  );
  return result;
};

const findByName = async (name) => {
  const db = await connection();
  const product = await db.collection('products').findOne({ name });
  return product;    
};

const findById = async (id) => {
  const db = await connection();
  const product = await db.collection('products').findOne(ObjectId(id));
  return product;    
};

const findAll = async () => {
  const db = await connection();
  const products = await db.collection('products').find({}).toArray();
  return products;  
};

module.exports = {
  create,
  findByName,
  findAll,
  findById,
  update,
};