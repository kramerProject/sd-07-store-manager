const connect = require('../config/conn');
const { ObjectId } = require('mongodb');

const add = async (name, quantity) =>
  connect().then(async (db) => {
    const product = await db.collection('products').insertOne({ name, quantity });
    return product.ops[0];
  });

const getAll = async () =>
  connect().then(async (db) => await db.collection('products').find().toArray());

const getOne = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  return connect().then((db) => db.collection('products').findOne(ObjectId(id)));
};

const updateOne = async (id, name, quantity) =>
  connect().then(async (db) => {
    await db
      .collection('products')
      .updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } });

    return {
      _id: id,
      name,
      quantity,
    };
  });

const updateQuantity = async (id, quantity, type) => {
  const product = await getOne(id);
  let newQuantity = product.quantity;
  if (type === 'sale') {
    newQuantity -= quantity;
  } else if (type === 'devolution') {
    newQuantity += quantity;
  }
  connect().then(async (db) => {
    await db.collection('products')
      .updateOne({ _id: ObjectId(id) }, { $set: {quantity: newQuantity} });
  });
};

const excludeOne = async (id) => {
  const product = await getOne(id);

  connect().then(async (db) => 
    db.collection('products').deleteOne({ _id: ObjectId(id) })
  );

  return {
    _id: id,
    name: product.name,
    quantity: product.quantity,
  };
};

module.exports = {
  add,
  getAll,
  getOne,
  updateOne,
  excludeOne,
  updateQuantity,
};
