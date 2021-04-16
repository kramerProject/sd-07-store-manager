const getConnection = require('./connection');
const { ObjectId } = require('mongodb');

const getProductByName = async (name) => {
  const connection = await getConnection();
  const res  = await connection.collection('products')
    .findOne({ name: name });
  return res;
};

const getOnePdt = async (prdId) => {
  try {
    const connection = await getConnection();
    const res  = await connection.collection('products')
      .findOne({ _id: ObjectId(prdId) });
    return res;
  } catch (err) {
    return false;
  }
};

const getProductsList = async () => {
  const connection = await getConnection();
  const productsList = await connection.collection('products').find().toArray();
  return productsList;
};

const registerProduct = async (name, amount) => {
  const connection = await getConnection();
  const res = await connection.collection('products')
    .insertOne({ name: name, quantity: amount});
  return res.ops[0];
};

const updatePdtById = async (name, id, amount) => {
  const connection = await getConnection();
  try {
    const res  = await connection.collection('products')
      .updateOne({ _id: ObjectId(id) }, { $set:{ name: name, quantity: amount } });
    return res;
  } catch (err) {
    console.log(err);
    return { error: err };
  }
};

module.exports = {
  getProductByName,
  getOnePdt,
  getProductsList,
  registerProduct,
  updatePdtById,
};
