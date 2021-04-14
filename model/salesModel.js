const conn = require('../config/conn');
const { ObjectId } = require('mongodb');

const addSale = async (products) => conn()
  .then(async (db) => {
    const sale = await db.collection('sales').insertOne({itensSold: products});
    return sale.ops[0];
  });

// const getAllSales = async () => conn()
//   .then((db) => db.collection('Sales').find().toArray());

// const getSaleByName = async (name) => conn()
//   .then((db) => db.collection('Sales').findOne({name}));

// const getSaleById = async (id) => conn()
//   .then((db) => db.collection('Sales').findOne({_id: ObjectId(id)}));

// const updateSale = async (id, name, quantity) => conn()
//   .then(async (db) => {
//     const Sale = await db.collection('Sales').updateOne(
//       { _id: ObjectId(id) },
//       { $set: {name, quantity}}
//     );
//     return ({ _id: id, name, quantity });
//   });

// const deleteSale = async (id) => conn()
//   .then(async (db) => {
//     const deletedSale = await getSaleById(id);
//     await db.collection('Sales').deleteOne({_id: ObjectId(id)});
//     return deletedSale;
//   });

module.exports = {
  addSale,
  // getSaleById,
  // getSaleByName,
  // getAllSales,
  // updateSale,
  // deleteSale,
};