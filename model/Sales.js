const { ObjectId } = require('mongodb');
const connection = require('./connections');

const findSaleById = (id) =>
  connection()
    .then((db) => db.collection('sales').findOne(ObjectId(id)))
    .catch(() => ({ status: 'error' }));

const addSales = (sales) =>
  connection()
    .then((db) =>
      db.collection('sales').insertOne({
        itensSold: sales,
      }),
    )
    .then((result) => result)
    .catch((err) => {
      console.log(err);
      process.exit(1);
    });

const findAllSales = () =>
  connection()
    .then((db) => db.collection('sales').find().toArray())
    .catch((err) => {
      console.log(err);
      process.exit(1);
    });

const updateSale = (id, sales) =>
  connection()
    .then((db) => db
      .collection('sales')
      .updateOne({ _id: id }, { $set: { itensSold: sales } }))
    .then((result) => result)
    .catch((err) => {
      console.log(err);
      process.exit(1);
    });

const deleteSale = (id) =>
  connection()
    .then((db) => db.collection('sales').deleteOne({ _id: ObjectId(id) }))
    .catch((err) => {
      console.log(err);
      process.exit(1);
    });

module.exports = {
  findAllSales,
  findSaleById,
  addSales,
  updateSale,
  deleteSale,
};
