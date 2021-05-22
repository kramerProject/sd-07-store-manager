const { ObjectId } = require('mongodb');
const connection = require('./connection');

const updateSale = async(id, quantity) => {
  return await connection()
    .then((db) => db.collection('sales')
      .updateOne({ _id: ObjectId(id) }, { $set: { itensSold: quantity }}))
    .then(() => ({ _id: ObjectId(id), itensSold: quantity }));
};

const createSale = async (itemsSold) => {
  return await connection()
    .then((db) => db.collection('sales').insertOne({ itensSold: itemsSold }))
    .then((result) => ({ _id: result.insertedId, itensSold: itemsSold }));
};

const deleteSale = async(id) => {
  return await connection()
    .then((db) => db.collection('sales')
      .deleteOne({ _id: ObjectId(id) }))
    .catch((err) => console.log(err));
};

const getAllSales = async () => {
  const getSales = await connection()
    .then((db) => db.collection('sales').find().toArray());
  return { sales: getSales };
};

const saleById = async (id) => {
  const saleData = await connection()
    .then((db) => db.collection('sales').findOne({_id: ObjectId(id)}))
    .catch((err) => console.log(err));
  if(!saleData) {
    return {
      err: {
        code: 'not_found',
        message: 'Wrong id format',
      }
    };
  }
  return saleData;
};

module.exports = {
  getAllSales,
  createSale,
  saleById,
  updateSale,
  deleteSale,
};
