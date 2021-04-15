const connect = require('../config/connection');
const { ObjectId } = require('mongodb');

const getAllSales = async () => {
  const allSales = await connect()
    .then((db) => db.collection('sales').find().toArray());
  return { sales: allSales };
};

const findSaleById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const sale = await connect()
    .then((db) => db.collection('sales').findOne(ObjectId(id)));
  return sale;
};

const create = async (itensSold) => {
  const addProduct = await connect()
    .then(db => db.collection('sales')
      .insertOne({ itensSold })
    );
  return addProduct.ops[0];
};

const exclude = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const excludeObject = await connect()
    .then((db) => db.collection('sales')
      .findOneAndDelete({ _id: ObjectId(id) })
    );
  return excludeObject.value;
};

const update = async (id, itensSold) => {
  if (!ObjectId.isValid(id)) return null;
  const sale = await connect()
    .then((db) => db.collection('sales')
      .findOneAndUpdate({ _id: ObjectId(id) },
        { $set: { itensSold } },
        { returnOriginal: false })
    );
  return product.value;
};

module.exports = { create, getAllSales, findSaleById, exclude, update};

