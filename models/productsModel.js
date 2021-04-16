const connection = require('./conn');
const { ObjectId } = require('mongodb');

const insertProduct = async (name, quantity) => {
  const { insertedId } = await connection().then((db) =>
    db.collection('products').insertOne({ name, quantity }),
  );
  return {
    _id: insertedId,
    name,
    quantity,
  };
};

const searchByName = async (name) => {
  const nameProduct = await connection().then((db) =>
    db.collection('products').findOne({ name: name }),
  );
  return nameProduct;
};

const getAllProducts = async () =>
  await connection().then((db) => db.collection('products').find({}).toArray());

const findByIdProduct = async (id) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }
  const product = await connection().then((db) =>
    db.collection('products').findOne(new ObjectId(id)),
  );

  return product;
};

const updateProduct = async (id, name, quantity) =>
  await connection().then((db) =>
    db.collection('products').updateOne(
    	{ _id: ObjectId(id) }, { $set: { name, quantity } }),
  );
//db.products.updateOne( {_id: ObjectId("60798e512381791ba7be751f")}, { $set: {"name": "AAA", "quantity": 50 }} );

module.exports = {
  insertProduct,
  searchByName,
  getAllProducts,
  findByIdProduct,
  updateProduct,
};
