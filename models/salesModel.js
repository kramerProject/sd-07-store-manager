const connect = require('../config/conn');
const { ObjectId } = require('mongodb');

const getAll = async () =>
  connect().then((db) => db.collection('sales').find().toArray());

const getById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  return connect().then((db) => db.collection('sales').findOne(ObjectId(id)));
};

const add = async (productList) =>{
  const newObj = {
    itensSold: productList,
  };
  const sale = await connect().then((db) => {
    return db.collection('sales').insertOne(newObj);
  });

  return sale;
};


const update = async (id, productId, quantity) =>
  connect().then(async (db) => {
    const sale = await db
      .collection('sales')
      .updateOne(
        { _id: ObjectId(id) },
        { $set: { itensSold: [{ productId, quantity }] }}
      );

    return sale;
  });

const exclude = async (id) =>
  connect().then(async (db) => db
    .collection('sales')
    .deleteOne(
      { _id: ObjectId(id) }
    )
  );

module.exports = {
  add,
  getAll,
  getById,
  update,
  exclude
};
