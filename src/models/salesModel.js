const conn = require('../database');
const { ObjectId } = require('mongodb');

const collectionName = 'sales';

const create = async (saleItens) => conn()
  .then((db) => db.collection(collectionName).insertOne({ itensSold: saleItens }));

const findAll = async () => conn()
  .then((db) => db.collection(collectionName).find().toArray());

const findById = async (id) => conn()
  .then((db) => db.collection(collectionName).findOne(ObjectId(id)));

const update = async (id, productId, quantity) => {
  conn().then((db) => db.collection(collectionName).updateOne(
    {
      _id: ObjectId(id),
      'itensSold.productId': productId
    },
    {
      $set: { 'itensSold.$.quantity': quantity }
    }
  ));
  return ({
    _id: id,
    itensSold: [{
      productId,
      quantity,
    }]

  });
};

const remove = async (id) =>
  conn().then((db) => db.collection(collectionName).deleteOne({ _id: ObjectId(id) }));

module.exports = {
  create,
  findAll,
  findById,
  update,
  remove
};
