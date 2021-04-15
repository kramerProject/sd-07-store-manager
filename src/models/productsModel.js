const connect = require('../../config/connection');
const { ObjectId } = require('mongodb');

const getAll = () => connect()
  .then(db => db.collection('products').find().toArray());

const getById = (id) => {
  if (!ObjectId.isValid(id)) return null;
  
  return connect()
    .then(db => db.collection('products').findOne(ObjectId(id)));
};

const add = async (name, quantity) => {
  const product = await connect()
    .then(db => db.collection('products').insertOne({ name, quantity }));

  return { _id: product.insertedId, name, quantity };
};

const getProductByName = (string) => connect()
  .then(db => db.collection('products').findOne({ name: string }));

const update = (id, name, quantity) => {
  const updatedProduct = connect()
    .then(db => db.collection('products').updateOne(
      { _id: ObjectId(id) },
      { $set: { name, quantity } }
    ));
  return { _id: updatedProduct.insertedId, name, quantity };
};

const deleteProduct = (product) => {
  connect()
    .then(db => db.collection('products').deleteOne(product));
  return product;
};

module.exports = {
  getAll,
  getById,
  add,
  getProductByName,
  update,
  deleteProduct
};
