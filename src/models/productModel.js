const connection = require('./connection');
const { ObjectId } = require('mongodb');

const getAll = async () => {
  return await connection()
    .then((db) => {
      return db.collection('products').find({}).toArray(); });
};

const getByName = async (name) => {
  return connection()
    .then((db) => db.collection('products').find({name}).toArray())
    .then((result) => { return result[0]; });
};

const getById = async (id) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }
  return connection().then(db => {
    db.collection('products').findOne(ObjectId(id));
  });
};

const create = async (name, quantity) => {
  let output = []; 
  await connection()
    .then((db) => db.collection('products').insertOne({ name, quantity }))
    .then(result => output = result.ops[0]);
  return output;
};

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
const deleteById = async (id) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  connection().then(db => {
    db.collection('products').remove(ObjectId(id));
  });
};

module.exports = {
  create,
  getAll,
  getByName,
  getById,
  setById,
  deleteById,
};
