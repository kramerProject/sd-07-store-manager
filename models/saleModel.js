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

const update = async ({ id, arrayProducts }) => {
  if (!ObjectId.isValid(id)) return null;

  const sale = await connection().then((db) =>
    db
      .collection('sales')
      .updateOne({ _id: ObjectId(id) }, { $set: { itensSold: arrayProducts } })
  );
  return sale;
  
};

const exclude = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  return connection().then((db) => {
    return db.collection('sales').deleteOne({ _id: ObjectId(id) });
  });
};

module.exports = {	
  create,
  getAll,
  getById,
  update,
  exclude
};