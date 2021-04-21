const connection = require('../configurations/connection');
const { ObjectId } = require('mongodb');

const { DB_NAME_PRODUCTS } = process.env;

const createNewProduct = async (name, quantity) => {
  const db = await connection();
  return await db.collection(DB_NAME_PRODUCTS).insertOne({ name, quantity });
};

const getProductByName = async (name) => {
  const db = await connection();
  const data = await db.collection(DB_NAME_PRODUCTS).findOne({ name });
  return data;
};

const getAllProducts = async () => {
  const db = await connection();
  return await db.collection(DB_NAME_PRODUCTS).find().toArray();
};

const getProductById = async (id) => {
  const db = await connection();
  return await db.collection(DB_NAME_PRODUCTS).findOne(new ObjectId(id));
};

const updateProductById = async (id, name, quantity) => {
  const db = await connection();
  const updated = await db
    .collection(DB_NAME_PRODUCTS)
    .updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } });

  if (!updated) return null;
  return {
    _id: id,
    name,
    quantity,
  };
};

const deleteProductById = async (id) => {
  const db = await connection();
  const deleted = await db.collection(DB_NAME_PRODUCTS).deleteOne({ _id: ObjectId(id) });
  if (deleted.deletedCount !== 1) return null;
  return id;
};

module.exports = {
  createNewProduct,
  getProductByName,
  getProductById,
  getAllProducts,
  updateProductById,
  deleteProductById,
};
