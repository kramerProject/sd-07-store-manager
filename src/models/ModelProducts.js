const { ObjectId } = require('mongodb');
const connection = require('../../data/connection');

const insert = async (name, quantity) => {
  const db = await connection();
  const result_1 = await db.collection('products').insertOne({ name, quantity });
  return {
    _id: result_1.insertedId,
    name,
    quantity
  };
};
const addNewSale = async (arraySale) => {
  const db = await connection();
  const result_1 = await db.collection('sales').insertOne({itensSold: arraySale});
  return {
    _id: result_1.insertedId,
    itensSold: arraySale,
  };
};
const getAllProducts = async () => {
  const db = await connection();
  const result_1 = await db.collection('products').find().toArray();
  return result_1;

};
const allSale = async() => {
  const db = await connection();
  const result_1 = await db.collection('sales').find().toArray();
  return result_1;
};
const findProduct = async () => {
  const db = await connection();
  const result_1 = await db.collection('products').find({}, { _id: 0, name: 1}).toArray();
  return result_1;
};

const getAllById = async(id) => {
  const db = await connection();
  const result_1 = await db.collection('products')
    .findOne(ObjectId(id));
  
  return result_1;
};

// const validSale = async(id) => {
//   const db = await connection();
//   const result_1 = await db.collection('sales')
//     .findOne(ObjectId(id));
//   if(result_1 === null){
//     return 1;
//   }
//   return result_1;
// };

const getsalById = async(id) => {
  const db = await connection();
  const result_1 = await db.collection('sales')
    .findOne(ObjectId(id));
  
  return result_1;
};
const updateByID = async(id, name, quantity) => {
  const db = await connection();
  await db.collection('products').updateOne(
    { _id: ObjectId(id) }, { $set: { name, quantity } },
  );
  return await getAllById(id);

};

const saleUpdateById = async(id, arraySales) => {
  const db = await connection();
  await db.collection('sales').updateOne(
    { _id: ObjectId(id) }, { $set: { itensSold: arraySales } },
  );
  return await getsalById(id);
};

const deletedById = async(id) => {
  const db = await connection();
  await db.collection('products')
    .deleteOne({ _id: ObjectId(id) });
  return await getAllById(id);
};
module.exports = {
  insert,
  findProduct,
  getAllProducts,
  getAllById,
  updateByID,
  deletedById,
  addNewSale,
  allSale,
  getsalById,
  saleUpdateById,
};
