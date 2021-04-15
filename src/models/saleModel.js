const connection = require('../config/connection');
const { ObjectId } = require('mongodb');

const getAllSales = async () => {
  return connection().then((db) => db.collection('Sales').find().toArray());
};

const getSaleById = async (id) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }
  return connection().then((db) => db.collection('Sales').findOne(ObjectId(id)));
};

const addNewSale = async (arrayOfProducts) => {
  return connection()
    .then((db) => db.collection('Sales').insertOne({ itensSold: arrayOfProducts }))
    .then((item) => item.ops[0]);
};

const updateSale = async (id, arrayOfProducts) => {
  return connection().then((db) =>
    db.collection('Sales')
      .updateOne({ _id: ObjectId(id) }, { $set: { itensSold: arrayOfProducts } })
  );
  // return { _id: id, name, quantity };
};

const deleteSale = async (id) => {
  connection().then(db => db.collection('Sales').deleteOne({ _id: ObjectId(id) }));
};

module.exports = {
  getAllSales,
  getSaleById,
  addNewSale,
  updateSale,
  deleteSale,
};
