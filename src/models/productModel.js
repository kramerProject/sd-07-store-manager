const { ObjectId } = require('mongodb');
const conn = require('../../config/conn');

const postProducts = async (name, quantity) => {
  const product = await conn().then((db) =>
    db.collection('products').insertOne({ name, quantity })
  );

  return { _id: product.insertedId, name, quantity };
};

const getAllProducts = async () => await conn()
  .then((db) =>
    db.collection('products')
      .find()
      .toArray());

const getProductById = async (id) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  return await conn()
    .then((db) =>
      db.collection('products')
        .findOne(new ObjectId(id)));
};

const updateProducts = async (id, name, quantity) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  const product = await conn().then((db) =>
    db.collection('products').updateOne(
      { _id: id },
      {
        $set: {
          name: name,
          quantity: quantity,
        }
      }
    ));

  return { _id: product.insertedId, name, quantity };
};

module.exports = {
  getAllProducts,
  getProductById,
  postProducts,
  updateProducts,
};
