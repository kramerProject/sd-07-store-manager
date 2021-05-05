const getConnection = require('./connection');
const { ObjectId } = require('mongodb');

const getAll = async () => 
  getConnection('products').then(db => db.find().toArray());

async function newProduct({ name, quantity }) {
  const db = await getConnection('products');
  const response = await db.insertOne({ name, quantity: Number(quantity) });

  return response.ops[0];
};

async function getByName(product) {
  const db = await getConnection('products');
  const response = await db.find({ name: product }).toArray();

  return response[0];
}

async function getById(id) {
  if (!ObjectId.isValid(id)) return null;
  const db = await getConnection('products');
  return await db.find(ObjectId(id)).toArray();
}

async function updateProduct(id, { name, quantity }) {
  if (!ObjectId.isValid(id)) return null;
  const newObjct = { name, quantity: +quantity };
  const db = await getConnection('products');
  await db.updateOne({ _id: ObjectId(id) }, { $set: newObjct });

  return { _id: id, ...newObjct };
}

async function deleteProduct(id) {
  if (!ObjectId.isValid(id)) return null;
  const db = await getConnection('products');
  const response = await db.deleteOne({ _id: ObjectId(id) });

  return response.deletedCount;
}

module.exports = {
  newProduct,
  getById,
  getByName,
  getAll,
  updateProduct,
  deleteProduct
};
