const conn = require('../../helpers/conn');

const createProduct = async(name, quantity) => {
  return (
    conn().then(async (db) => {
      const newProduct = await db.collection('products').insertOne({ name, quantity });
      return newProduct.ops[0];
    })
  );    
};

const getProductByName = async(name) => {
  return (
    conn().then(async (db) => {
      const productExist = await db.collection('products').findOne({ name: name });
      return productExist;
    })
  );
};

const getAllProducts = async() => {
  return (
    conn().then( async (db) => {
      const allProducts = await db.collection('products').find().toArray();
      return allProducts;
    })
  );
};

module.exports = {
  createProduct,
  getProductByName,
  getAllProducts
};