const connection = require('./connection');
const { ObjectId } = require('mongodb');

const getAll = async () => {
  return await connection()
    .then((db) => db.collection('sales')
      .find().toArray());
};

const findByid = async (id) => {
  return await connection()
    .then((db) => db.collection('sales')
      .findOne(ObjectId(id)));
};

const create = async (itensSold) => {
  const sale = await connection()
    .then((db) =>
      db.collection('sales')
        .insertOne({itensSold})
    );
  return sale ;
};
const deleteSales = async (id) => {
  return await connection()
    .then((db) => db.collection('sales')
      .deleteOne( { _id: ObjectId(id) }));
};

module.exports = {
  getAll,
  create,
  findByid,
  deleteSales,
};
