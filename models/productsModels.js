const connection = require('../config/conn');
const { ObjectId } = require('mongodb');

const getAll = async () =>
  connection()
    .then((db) => db.collection('products').find().toArray());

const addProduct = async (name, quantity) => {
  const product = await connection().then((db) => 
    db.collection('products').insertOne({ name, quantity })
  );

  return { _id: product.insertedId, name, quantity };
};

const getByProductId = async (id) => {
  //if (!ObjectID.isValid(id)) return null;
  const result = await connection().then((db) =>
    db.collection('products').findOne(ObjectId(id))
  );
  return result;
};


const updateById = async (id, name, quantity) =>
  connection().then(async (db) => {
    const product = await db
      .collection('products')
      .updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } });
    return { _id: id, name, quantity };
  });

const deleteProduct = async (id) =>
  connection().then((db) => db.collection('products').deleteOne({ _id: ObjectId(id) }));

module.exports = {
  getAll,
  addProduct,
  getByProductId,
  updateById,
  deleteProduct,
};
