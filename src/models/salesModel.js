const connection = require('../config/connection');

const { ObjectId } = require('mongodb');


const addSale = async (body) => {
  
  const sale = [...body];
  const result = await connection()
    .then((db) => db.collection('sales').insertOne({ itensSold: sale }));
  return {
    _id: result.insertedId,
    itensSold: body,
  };
};

const getAll = async () => {
  const result = await connection()
    .then((db) => db.collection('sales').find().toArray());

  return {
    sales: result
  };
};

const getById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const resultCheck = await connection()
    .then((db) => db.collection('sales').findOne(new ObjectId(id)));

  if (!resultCheck) return null;
  return resultCheck;
};

const updateSale = async (id, body) => {
  if (!ObjectId.isValid(id)) return null;
  const resultCheck = await connection()
    .then((db) => db.collection('sales').findOne(new ObjectId(id)));

  if (!resultCheck) return null;
  await connection()
    .then((db) => db.collection('sales').updateOne({ _id: ObjectId(id) },
      {
        $set: {
          itensSold: body
        }
      }
    ));

  return {
    _id: id,
    itensSold: body,
  };
};

const deleteSale = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const resultCheck = await connection()
    .then((db) => db.collection('sales').findOne(new ObjectId(id)));

  if (!resultCheck) return null;
  await connection()
    .then((db) => db.collection('sales').deleteOne({ _id: ObjectId(id) }));

  return resultCheck;
};

module.exports = {
  addSale,
  getAll,
  getById,
  updateSale,
  deleteSale,
};