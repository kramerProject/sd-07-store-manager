const connection = require('../config/conn');
const { ObjectId } = require('mongodb');

const createSalesModel = async(salesArrayOfItens) => {
  const db = await connection();
  const product = await db
    .collection('sales')
    .insertOne({ itensSold: [...salesArrayOfItens] });
  return product.ops[0];
};

const getAllSalesModel = async() => {
  const db = await connection();
  return await db.collection('sales').find().toArray();
};

const getSaleByIdModel = async(id) => {
  if(!ObjectId.isValid(id)) return false;
  const db = await connection();
  return db.collection('sales').findOne(ObjectId(id));
};

const updateSaleModel = async(id, salesArrayOfItens) => {
  const db = await connection();
  const updatedProduct = db.collection('sales').updateOne(
    { _id: ObjectId(id) }, { $set:
       {
         productId: salesArrayOfItens[0].productId,
         quantity: salesArrayOfItens[0].quantity,
       }
    }
  );
  if (!updatedProduct) return false;
  return { _id: id, itensSold: salesArrayOfItens };
};

const deleteSaleModel = async (id) => {
  if (!ObjectId.isValid(id)) return false;
  const db = await connection();
  return await db.collection('sales').deleteOne({ _id: ObjectId(id) });
};

module.exports = {
  createSalesModel,
  getAllSalesModel,
  getSaleByIdModel,
  updateSaleModel,
  deleteSaleModel,
};
