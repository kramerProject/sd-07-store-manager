const connection = require('../config/connection');
const { ObjectId } = require('mongodb');

//  \/ Req. 2 Crie um endpoint para listar os produtos
const getAllProducts = () => {
  return connection().then(
    db => db.collection('products').find().toArray()
  );
};

const findProductByName = (productName) => {
  return connection().then(
    db => db.collection('products').find({ name: productName }).toArray()
  );
};

//  \/ Req. 2 Crie um endpoint para listar os produtos
const findById = async (id) => {
  if(!ObjectId.isValid(id)) return null;

  return connection().then(
    db => db.collection('products').findOne(ObjectId(id))
  );
};

const updateById = async (id, name, quantity) => {
  return connection().then(
    db => db.collection('products')
      .updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } })
  ).then(() => ({ _id: id, name, quantity }));
};

// \/ Req. 1 Crie um endpoint para o cadastro de produtos
const createProduct = async (name, quantity) => {
  return connection().then(
    db => db.collection('products').insertOne({ name, quantity })
  ).then((result) => ({ _id: result.insertedId, name, quantity }));
};

const deleteProduct = async (id) => {
  return connection().then(
    db => db.collection('products').deleteOne({ _id: ObjectId(id) })
  ).then((result) => ({ _id: result._id}));
};

module.exports = {
  getAllProducts,
  findById,
  createProduct,
  findProductByName,
  updateById,
  deleteProduct,
};
