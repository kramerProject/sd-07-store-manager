const connection = require('./conn');
const { ObjectId } = require('mongodb');

const addSales = async (data) => {
  const { insertedId } = await connection().then((db) =>
    db.collection('sales').insertOne({ itensSold: data }),
  );
  return {
    _id: insertedId,
    itensSold: data,
  };
};

const getAllSales = async () =>
  await connection().then((db) => db.collection('sales').find({}).toArray());

const findByIdSales = async (id) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }
  const idSales = await connection()
    .then((db) => db.collection('sales').findOne(new ObjectId(id)));

  return idSales;
};

const deleteSales = async (id) =>
  await connection()
    .then((db) => db.collection('sales').deleteOne({ _id: ObjectId(id) }));

module.exports = { addSales, findByIdSales, getAllSales, deleteSales };
