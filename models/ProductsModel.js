const connection = require('./connection');
const { ObjectId } = require('mongodb');

const getAll = async () =>
  await connection()
    .then((db) => db.collection('products').find().toArray())
    .then((produtcs) => produtcs);

const create = async (name, quantity) =>
  await connection()
    .then((db) => db.collection('products').insertOne({ name, quantity }))
    .then(result => {
      return ({
        _id: result.insertedId,
        name,
        quantity,
      });
    });

const findByName = async (name) => 
  await connection()
    .then((db) => db.collection('products').findOne({ name: name }));

const findById = async (id) =>
  await connection()
    .then((db) => db.collection('products').findOne(ObjectId(id)));

const updateById = async (id, name, quantity) => 
  await connection()
    .then((db) => db.collection('products').updateOne(
      {_id: ObjectId(id)},
      { $set: 
        { 
          name,
          quantity,
        },
      }))
    .then(() => {
      return ({
        _id: id,
        name,
        quantity,
      });
    });

const updateQtyById = async (id, quantity) => 
  await connection()
    .then((db) => db.collection('products').updateOne(
      {_id: ObjectId(id)},
      { $inc: 
        {
          quantity: quantity,
        },
      }))
    .then(() => {
      return ({});
    });

const deleteById = async (id) => 
  await connection()
    .then((db) => db.collection('products').deleteOne({ _id: ObjectId(id) }))
    .then(() => true);

module.exports = {
  getAll,
  create,
  findByName,
  findById,
  updateById,
  deleteById,
  updateQtyById,
};
