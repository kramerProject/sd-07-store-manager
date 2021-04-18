const connection = require('../config/conn');
const { ObjectId } = require('mongodb');

const create = async (products) => {
  const objProducts = {
    itensSold: products
  };
  const sale = await connection().then((db) => {
    return db.collection('sales').insertOne(objProducts);
  });

  return { _id: sale.insertedId, itensSold: products };
};

const getAll = async () => {
  const sales = await connection().then((db) => {
    return db.collection('sales').find().toArray();
  });
  return sales;
     
};  

const getById = async (id) => {
  const sale = connection().then((db) => {
    return db.collection('sales').findOne({ _id: ObjectId(id) });
  });
  
  return sale;
    
};
/*
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
  getAll,
  getById,
  //update,
  //exclude
};