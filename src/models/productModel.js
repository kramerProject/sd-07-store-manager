const connection = require('./connection');
const { ObjectId } = require('mongodb');

const getAll = async () => {
  return connection()
    .then((db) => db.collection('products').find().toArray());
};

const getByName = async (name) => {
  return connection()
    .then((db) => db.collection('products').find({name}).toArray());
};

const getById = async (id) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }
  return connection().then(db => {
    db.collection('products').findOne(ObjectId(id));
  });
};

const create = async (name, quantity) =>
  connection()
    .then((db) => db.collection('products').insertOne({ name, quantity }))
    .then(result => getNewProduct({ id: result.insertedId, name, quantity }));

const setById = async (id, newName, newQuantity) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  connection().then(db =>{
    db.collection('products').updateOne(ObjectId(id),
      {
        $set:{
          name: newName,
          quantity: newQuantity,
        }  
      });
  });
};

module.exports = {
  create,
  getAll,
  getByName,
  getById,
  setById,
};
