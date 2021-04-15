const connect = require('../config/connect');

// criar endpoint - cadastro produtos
const createProduct = async(name, quantity) => {
  return connect().then(db => db.collection('products').insertOne({ name, quantity }))
    .then(response => response.ops[0]).catch(error => console.error(error.message));
};

const getProductByName = async(name) => {
  return connect().then(db => db.collection('products').findOne(name))
    .catch((error) => console.error(error.message));
};

module.exports = {
  createProduct,
  getProductByName,
};