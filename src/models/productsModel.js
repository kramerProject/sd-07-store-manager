const getConnection = require('./connection');

const getProductByName = async (name) => {
  const connection = await getConnection();
  const res  = await connection.collection('products')
    .findOne({ name: name });
  return res;
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

module.exports = {
  getProductByName,
  getProductsList,
  registerProduct,
};
