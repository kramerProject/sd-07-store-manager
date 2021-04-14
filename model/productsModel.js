const { ObjectId } = require('mongodb');
const connection = require('./connection');

const addProduct = async (name, quantity) => {
  try {
    const { insertedId } = await connection()
      .then((db) => db.collection('products').insertOne({ name, quantity }));

    return ({
      _id: insertedId,
      name,
      quantity
    });

  } catch (error) {
    console.error(error);
    return process.exit(1);
  }
};

const getAll = async () => {
  try {
    return await connection().then((db) => db.collection('products').find().toArray());

  } catch (error) {
    console.error(error);
    return process.exit(1);
  }
};

const getById = async (id) => {
  return await connection().then((db) => db.collection('products').findOne(ObjectId(id)));
};

const updateProduct = async (id, name, quantity) => {
  await connection()
    .then((db) => db.collection('products')
      .updateOne(
        { _id: ObjectId(id) },
        {
          $set: {
            name,
            quantity
          }
        }
      )
    );

  return ({
    id,
    name,
    quantity
  });
};

const deleteProduct = async (id) => {
  const productDeleted = await getById(id);

  await connection()
    .then((db) => db.collection('products').deleteOne({ _id: ObjectId(id) }));

  return productDeleted;
};

const NEGATIVE = -1;

const subtractProduct = async ({ productId, quantity }) => {
  return connection()
    .then((db) => db.collection('products').updateOne(
      { _id: ObjectId(productId) },
      { $inc: { quantity: (quantity * NEGATIVE) }}
    ));
};

const sumProduct = async ({ productId, quantity }) => {
  return connection()
    .then((db) => db.collection('products').updateOne(
      { _id: ObjectId(productId) },
      { $inc: { quantity: quantity } }
    ));
};

module.exports = {
  addProduct,
  getAll,
  getById,
  updateProduct,
  deleteProduct,
  subtractProduct,
  sumProduct
};
