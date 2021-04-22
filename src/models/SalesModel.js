const connect = require('../../config/connection');
const { ObjectId } = require('mongodb');

const add = async (listSale) =>
  connect().then(async (db) => {
    const sale = await db
      .collection('sales')
      .insertOne({ itensSold: listSale });

    return sale.ops[0];
  });

const getAll = async () =>
  connect().then(async (db) => {
    const sales = await db
      .collection('sales')
      .find().toArray();
    
    return sales;
  });

const getByID = async (id) =>
  connect().then(async (db) => {
    const sale = await db
      .collection('sales')
      .findOne(ObjectId(id));
    return sale;
  });

const updateByID = async (id, itensSold) =>
  connect().then(async (db) => {
    const sale = await db
      .collection('sales')
      .updateOne({ _id: ObjectId(id)}, {$set: { itensSold }}
      );

    console.log('sale', sale);
    return {_id: id, itensSold};
  });

module.exports = {
  add,
  getAll,
  getByID,
  updateByID,
};
