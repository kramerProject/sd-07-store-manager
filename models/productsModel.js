const connection = require('./connection');
const { ObjectId } = require('mongodb');

const getAllProducts = async () => {
  return await connection()
    .then((db) => db.collection('products').find().toArray());
}

const createProduct = async (name, quantity) => {
  const prod = await connection()
    .then((db) => db.collection('products').insertOne({ name, quantity }))
  return { _id: prod.insertedId, name, quantity };
}

const productById = async (id) => {
  // if(!ObjectId.isValid(id)) return null
  const productData = await connection()
    .then((db) => db.collection('products').findOne(new ObjectId(id)));
    if(!productData) return null // {
  return productData;
}

// const findProductByName = async (name) => {
//   const productsData = await connection()
//     .then((db) => db.collection('products').findOne({name}));

//   if(!productsData) return null;

//   const { name, quantity } = productsData;

//   return getNewProduct({ id, name, quantity });
// }

module.exports = {
  getAllProducts,
  createProduct,
  productById,
  // findProductByName,
}
