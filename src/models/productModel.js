const { ObjectId } = require('mongodb');
const conn = require('../../config/conn');

const getAllProducts = async () =>
  conn()
    .then((db) => db.collection('products').find().toArray());


const getProductById = async (id) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  return conn()
    .then((db) =>
      db.collection('products')
        .findOne(ObjectId(id)));
};

module.exports = {
  getAllProducts,
  getProductById
};
