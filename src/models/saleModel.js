const connection = require('../../config/connection');
const { ObjectId } = require('mongodb');

const create = async (itensSold) => {
  return connection()
    .then((db) => db.collection('sales').insertOne({ itensSold }))
    .then((result) => result.ops);
};

const findAll = async () => {
  return connection()
    .then((db) => db.collection('sales').find().toArray());
};

const findById = async (id) => {
  return connection()
    .then((db) => db.collection('sales').findOne(ObjectId(id)));
};

const update = async (id, quantity, productId) => {
  return connection()
    .then((db) => db.collection('sales')
      .updateOne({ _id: ObjectId(id), 'itensSold.productId': productId},
        { $set: { 'itensSold.$.quantity': quantity } }));
};

const exclude = async (id) => {
  connection()
    .then((db) => db.collection('sales').deleteOne({ _id: ObjectId(id) }));
};

module.exports = {
  create,
  findAll,
  findById,
  update,
  exclude,
};
