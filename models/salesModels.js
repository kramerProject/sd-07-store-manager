const connect = require('../config/conn');
const { ObjectId } = require('mongodb');

const createSales = async (salesList) => {
  return await connect().then(async (db) => {
    const sale = await db.collection('sales').insertOne({
      '_id': ObjectId(),
      'itensSold': salesList
    });
    return sale.ops[0];
  });
};

const getAll = async () =>
  connect().then((db) => db.collection('sales').find().toArray());

const salesId = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const data = await connect()
    .then((db) => db.collection('sales').findOne(ObjectId(id)));
  console.log(data);
  return data;
};

const updateSale = async (id, { productId, quantity }) => {
  if (!ObjectId.isValid(id)) return null;

  const sale = await connect()
    .then((db) => db.collection('sales')
      .updateOne({ _id: ObjectId(id) }, { $set: { productId, quantity } }));
  return sale;
};

const deleteSale = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const saleIdd = await salesId(id);
  if (saleIdd) {
    connect().then(async (db) => {
      db.collection('sales').deleteOne({ _id: ObjectId(id) });
    });
    return saleIdd;
  }
};

module.exports = {
  createSales,
  salesId,
  getAll,
  updateSale,
  deleteSale,
};
