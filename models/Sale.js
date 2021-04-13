const { ObjectId } = require('mongodb');
const connection = require('./connection');
const errorHandler = require('../helpers/errorHandler');

const findSaleById = (id) => connection()
  .then((db) => db.collection('sales').findOne(ObjectId(id)))
  .catch(() => ({ status: 'error' }));

const addSales = (sales) => connection()
  .then((db) => db.collection('sales').insertOne({
    itensSold: sales,
  }))
  .then((result) => result)
  .catch(errorHandler);

const findAllSales = () => connection()
  .then((db) => db.collection('sales').find().toArray())
  .catch(errorHandler);

const updateSale = (id, sales) => connection()
  .then((db) => db.collection('sales').updateOne(
    { _id: id },
    { $set: { itensSold: sales } },
  ))
  .then((result) => result)
  .catch(errorHandler);

const deleteSale = (id) => connection()
  .then((db) => db.collection('sales').deleteOne({ _id: ObjectId(id) }))
  .catch(errorHandler);

module.exports = {
  findAllSales,
  findSaleById,
  addSales,
  updateSale,
  deleteSale,
};
