const { ObjectId } = require('mongodb');
const connection = require('./connection');

const col = 'products';

const getAllProducts = async () => {
  return connection()
    .then((db) => db.collection(col).find().toArray());
};

const insertProduct = async (product) => {
  return connection()
    .then((db) => db.collection(col).insertOne({ ...product }))
    .then((result) => {
      return { _id: result.insertedId, ...product };
    });
};

const getProductByID = async (id) => {
  return connection()
    .then((db) => db.collection(col).findOne(ObjectId(id)));
};

const updateProduct = async (id, product) => {
  connection()
    .then((db) => db.collection(col)
      .updateOne(
        { _id: ObjectId(id) },
        { $set: { ...product } },
      ));

  const result = await getProductByID(id);

  return result;
};

const updateProductQuantity = async (id, quantity) => {
  const product = await getProductByID(id);

  connection()
    .then((db) => db.collection(col)
      .updateOne(
        { _id: ObjectId(id) },
        { $set: { ...product, quantity: quantity }},
      ));
};

const deleteProduct = async (id) => {
  const result = await getProductByID(id);
  connection()
    .then((db) => db.collection(col)
      .deleteOne({ _id: ObjectId(id) }));
  
  return result;
};

module.exports = {
  getAllProducts,
  insertProduct,
  getProductByID,
  updateProduct,
  updateProductQuantity,
  deleteProduct,
};
