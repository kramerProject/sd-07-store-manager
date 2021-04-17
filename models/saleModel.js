const connection = require('../config/conn');
const { ObjectId } = require('mongodb');

const create = async (products) => {
  const sale = await connection().then((db) =>
    db.collection('sales').insertOne({ products })
  );

  return { _id: sale.insertedId, itensSold: products };
};
/*
const getAll = async () => 
  connection().then((db) => 
    db.collection('products').find().toArray());

const getById = async (id) => {
  return connection().then((db) => 
    db.collection('products').findOne({ _id: ObjectId(id) }));
};

const update = async ({ id, name, quantity }) => {
  if (!ObjectId.isValid(id)) return null;

  const product = await connection().then((db) =>
    db
      .collection('products')
      .updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } })
  );
  return product;
};

const exclude = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  return connection().then((db) => {
    return db.collection('products').deleteOne({ _id: ObjectId(id) });
  });
};

*/    


module.exports = {	
  create,
  //getAll,
  //getById,
  //update,
  //exclude
};