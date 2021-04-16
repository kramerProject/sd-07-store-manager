const connect = require('../configuration/connection');
const { ObjectId } = require('mongodb');

const getAll = async () => {
  const products = await connect().then((db) =>
    db.collection('products').find().toArray());
  return products;
};

const getById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const product = await connect().then((db) =>
    db.collection('products').findOne(ObjectId(id)));
  return product;
};

const countByName = async (name) => {
  const product = await connect().then((db) =>
    db.collection('products').countDocuments({ 'name': name }));
  return product;
};

const add = async (name, quantity) => {
  const product = await connect().then((db) =>
    db.collection('products').insertOne({ name, quantity }));
  return product.ops[0];
};

const update = async (updateData) => {
  const result = await connect().then((db) =>
    db.collection('products')
      .updateOne(
        {_id: ObjectId(updateData._id) },
        { $set: {name: updateData.name, quantity: updateData.quantity }}
      ));
  return updateData;
};

const deleteOneProduct = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const product = await connect().then((db) =>
    db.collection('products').findOne(ObjectId(id)));
  await connect().then((db) =>
    db.collection('products').deleteOne({ _id: ObjectId(id) }));
  return product;
};
const countExistentIds = async (arrayIds) => {
  const idsQuantity = arrayIds.length;
  const objIds = arrayIds.map(id => ObjectId(id));

  const existentsIdsQuantity = await connect().then((db) =>
    db.collection('products').countDocuments({ _id: { $in: objIds } }));
  return existentsIdsQuantity;
};

module.exports = {
  add,
  getAll,
  getById,
  countByName,
  update,
  deleteOneProduct,
  countExistentIds
};
