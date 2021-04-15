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
  return { id: insertedId, name, quantity };
};

const findByName = async (name) => {
  try {
    const db = await connection();
    const product = await db.collection('products').findOne({ name });
    return product;    
  } catch (error) {
    console.log(error);
    return error;
  }
};

module.exports = {
  create,
  findByName,
};