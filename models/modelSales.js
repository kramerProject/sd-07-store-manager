const { connection } = require('./connection');
const { ObjectId } = require('mongodb');

async function addSales(sale) {
  return await connection()
    .then((db) => db.collection('sales').insertOne({ itensSold: sale }))
    .then((data) => ({ _id: data.insertedId, itensSold: sale }));
}

async function findNameSales(name) {
  return await connection().then((db) => db.collection('sales').findOne({ name }));
}

async function findAllSales() {
  return await connection().then((db) => db.collection('sales').find({}).toArray());
}

async function findIdSales(id) {
  if (!ObjectId.isValid(id)) throw new Error();
  return await connection()
    .then((db) => db.collection('sales')
      .findOne({ _id: ObjectId(id) }));
}

async function editSales(id, sale) {
  if (!ObjectId.isValid(id)) throw new Error();
  return await connection().then((db) =>
    db
      .collection('sales')
      .updateOne({ _id: ObjectId(id) }, { $set: { itensSold: sale } })
      .then(() => ({ _id: ObjectId(id), itensSold: sale})),
  );
}

async function deleteSales(id) {
  if (!ObjectId.isValid(id)) throw new Error();
  return await connection()
    .then((db) => db.collection('sales').deleteOne({ _id: ObjectId(id) }))
    .then(() => findIdSales(id));
}

module.exports = {
  addSales,
  findNameSales,
  findAllSales,
  findIdSales,
  editSales,
  deleteSales,
};
