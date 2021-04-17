const { ObjectId } = require('bson');
const connection = require('./connection');
require('dotenv').config();

const getProduct = (id, name, quantity) => {
  return { _id: id, name, quantity };
};
const updateProduct = async (id, name, quantity) => {
  const params = { $set: { name: name, quantity: quantity } };
  const options = { upsert: true };
  const filter = {_id: ObjectId(id)};
  return connection()
    .then((db) =>
      db.collection('products')
        .updateOne(filter, params, options),
    )
    .then((result) => getProduct(id, name, quantity))
    .catch((error) => `Erro na model updateProduct: ${error}`);
};

module.exports = {
  updateProduct,
};
