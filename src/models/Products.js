const connection = require('./connection');

const create = async (name, quantity) =>
  connection()
    .then ((db) => db.collection('products').insertOne({ name, quantity }));

const deleteProduct = async (id) =>
  connection()
    .then((db) => db.collection('products') .deleteOne({ _id: ObjectId(id) }));

const getAll = async () => 
  connection() 
    .then ((db) => db.collection('products').find().toArray());

const getProduct = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  return connection()
    .then ((db) => db.collection('products').findOne(new ObjectId(id)));
};

const updateProduct = async (id, name, quantity) =>
  connection()
    .then((db) => db.collection('products')
      .updateOne({_id: ObjectId(id)}, {$set: {name: name, quantity: quantity}}));

module.exports  = { create, getAll, getProduct, updateProduct, deleteProduct };   