const connection = require('../config/conn');
const { ObjectId } = require('mongodb');

/* const create = async (firstName, middleName, lastName) =>
connection()
    .then((db) =>
    db.collection('authors').insertOne({ firstName, middleName, lastName })
    ).then((result) => result);
 */
const create = async (itens) => {
  const db = await connection();
  const { insertedId } = await db.collection('sales').insertOne({ itensSold: itens });
  return insertedId;
};

const update = async (id, itens) => {
  const db = await connection();
  const { result } = await db.collection('sales').updateOne(
    {
      '_id': ObjectId(id) },
    {
      $set: {
        'itensSold': itens
      },
    }
  );
  return result;
};

const remove = async (id) => {
  const db = await connection();
  const { result } = await db.collection('sales').deleteOne({ '_id': ObjectId(id) });
  return result;
};

const findById = async (id) => {
  const db = await connection();
  const sale = await db.collection('sales').findOne(ObjectId(id));
  return sale;    
};

const findAll = async () => {
  const db = await connection();
  const sales = await db.collection('sales').find({}).toArray();
  return sales;  
};

module.exports = {
  create,
  findAll,
  findById,
  update,
  remove,
};
