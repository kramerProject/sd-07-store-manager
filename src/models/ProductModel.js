const { ObjectId } = require('mongodb');
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
    conn().then(async (db) => {
      const allProducts = await db.collection('products').find().toArray();
      return allProducts;
    })
  );
};

const getProductById = async(id) => {
  return(
    conn().then(async(db) => {
      if (!ObjectId.isValid(id)) return null;
      const productById = await db.collection('products').findOne({ _id: ObjectId(id)});
      return productById;
    })
  );
};

const updateProduct = async(id, name, quantity) => {
  return (
    conn().then(async (db) => {
      const updatedProduct = await db.collection('products')
        .updateOne({_id: ObjectId(id)}, {$set: {name, quantity}});
      return  { _id: id, name, quantity };
    })
  ); 
};

module.exports = {
  createProduct,
  getProductByName,
  getAllProducts,
  getProductById,
  updateProduct
};