const connection = require('./connection');
const { ObjectId } = require('mongodb');

const addProductDB = async (name, quantity) => {
  const { insertedId } = await connection().then((db) =>
    db.collection('products').insertOne({ name, quantity }),
  );
  const data = {
    _id: insertedId,
    name,
    quantity,
  };
  console.log(`addProductDB no model valor : ${data}`);
  return data;
};

const findProduct = async (name) => {
  const findedProduct = await connection().then((db) =>
    db.collection('products').findOne({ name }),
  );
  return findedProduct;
};

const getAllProductDB = async () => {
  const AllProducts = await connection()
    .then((db) => db.collection('products').find().toArray());
  // console.log(`AllProducts em getProductDB: ${AllProducts}`);
  return AllProducts;
};

const getProductByIdDB = async (id) => {
  const productById = await connection().then((db) =>
    db.collection('products').findOne(ObjectId(id)),
  );
  // console.log(`productById em getProductByIdDB: ${productById}`);
  return productById;
};

const updateProductDB = async (id, name, quantity) => {
  const updatedProduct = await connection().then((db) =>
    db.collection('products').updateOne(
      { _id: id },
      { $set: {name: name, quantity: quantity } }),
  );
  console.log(`updatedProduct em updateProductDB: ${updatedProduct}`);
  const data = {
    _id: id,
    name,
    quantity    
  }; 
  return data;
};

const deleteProductDB = async (id) => {
  const deletedProduct = await connection().then((db) =>
    db.collection('products').deleteOne( {_id: ObjectId(id)} )
  );
  // tem que arrumar a comunicação do update e do delete que não estão passando
  console.log(`deletedProduct em deleteProductDB: ${deletedProduct}`);
  return deletedProduct;
};

module.exports = {
  addProductDB,
  findProduct,
  getAllProductDB,
  getProductByIdDB,
  updateProductDB,
  deleteProductDB
};
