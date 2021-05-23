const connection = require('./connection');
const { ObjectId } = require('mongodb');

const getAll = async () =>
  await connection()
    .then((db) => db.collection('sales').find().toArray())
    .then((produtcs) => produtcs);

const create = async (sales) =>
  await connection()
    .then((db) => db.collection('sales').insertOne({
      itensSold: sales,
    }))
    .then(result => {
      return ({
        _id: result.insertedId,
        itensSold: sales,
      });
    });

const findByName = async (name) => 
  await connection()
    .then((db) => db.collection('sales').findOne({ name: name }));

const findById = async (id) =>
  await connection()
    .then((db) => db.collection('sales').findOne(ObjectId(id)));
  
const updateById = async (id, productId, quantity) => 
  await connection()
    .then((db) => db.collection('sales').updateOne(
      { $and: [
        { '_id': ObjectId(id) },
        { 'itensSold.productId': productId }],
      },
      { $set:
        { 
          'itensSold.0.quantity': quantity,
        },
      }))
    .then(() => {
      return ({
        _id: id,
        itensSold: [{ productId, quantity}],
      });
    });

const deleteById = async (id) => 
  await connection()
    .then((db) => db.collection('sales').deleteOne({ '_id': ObjectId(id) }))
    .then(() => true);

module.exports = {
  getAll,
  create,
  findByName,
  findById,
  updateById,
  deleteById,
};
