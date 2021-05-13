const { ObjectId } = require('mongodb');
const connection = require('../../data/connection');

const insert = async (name, quantity) => {
  const db = await connection();
  const result_1 = await db.collection('products').insertOne({ name, quantity });
  return{
    _id: result_1.insertedId,
    name,
    quantity
  };

  
};
const getAllProducts = async () => {
  const db = await connection();
  const result_1 = await db.collection('products').find().toArray();
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
const updateByID = async(id, name, quantity) => {
  const db = await connection();
  await db.collection('products').updateOne(
    { _id: ObjectId(id) }, { $set: { name, quantity } },
  );
  return await getAllById(id);

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
  deletedById
};
