const conn = require('../config/conn');

const addProduct = async (name, quantity) => {
  conn().then(async (db) => {
    const product = await db.collection('products').insertOne({name, quantity});
    return product.ops[0];
  });
};

const getAllProducts = async () => conn()
  .then((db) => db.collection('products').find().toArray());

const getProductByName = async (name) => conn()
  .then((db) => db.collection('products').findOne({name}));

const updateProduct = async (id, name, quantity) => conn()
  .then(async (db) => {
    const product = db.collection('products').updateOne(
      { _id: id },
      { $set: {name, quantity}}
    );
  });

const deleteProduct = async (id) => conn()
  .then(async (db) => db.collection('products').deleteOne({_id: id}));

module.exports = {
  addProduct,
  getProductByName,
  getAllProducts,
  updateProduct,
  deleteProduct,
};