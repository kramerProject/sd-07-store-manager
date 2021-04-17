const { ObjectId } = require('bson');
const connection = require('../configs/connection');


const createSale = async (itensSold) => {
  const salesRes = await connection().then((db) => 
    db.collection('sales').insertOne({ itensSold }));

  return salesRes.ops[0];
};

const getSales = async () => {
  const salesRes = await connection().then((db) => 
    db.collection('sales').find().toArray());

  return salesRes;
};

const getSalesById = async (id) => {
  const res = await connection().then((db) => 
    db.collection('sales').findOne(ObjectId(id)));
  return res;
};

const updateSale = async (id, itensSold) => {
  const res = await connection().then((db) => db
    .collection('sales')
    .updateOne({ _id: ObjectId(id)}, { $set: { itensSold } }));

  
  return {
    _id: id,
    itensSold
  };
};

const deleteSales = async (id, salesRes) => {

  await connection().then((db) => db
    .collection('sales')
    .deleteOne({ _id: ObjectId(id)}));

  
  return salesRes;
};


module.exports = {
  createSale,
  getSales,
  getSalesById,
  updateSale,
  deleteSales
};