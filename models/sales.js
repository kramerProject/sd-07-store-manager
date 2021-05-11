const { ObjectId } = require('mongodb');
const connection = require('./connection');
const { updateProductQuantity, getProductByID } = require('./products');

const col = 'sales';

const getAllSales = async () => {
  return connection()
    .then((db) => db.collection(col).find().toArray());
};

const getSaleById = async (id) => {
  return connection()
    .then((db) => db.collection(col).findOne(ObjectId(id)));
};

const createSale = async (productsArray) => {
  productsArray.forEach((product) => {
    getProductByID(product.productId)
      .then((item) => {
        updateProductQuantity(
          product.productId,
          item.quantity - product.quantity
        );
      });
  });
  return connection()
    .then((db) => db.collection(col)
      .insertOne({ itensSold: productsArray })
      .then((result) => {
        return { _id: result.insertedId, itensSold: productsArray };
      }));
};

const updateSale = async (id, sale) => {
  return connection()
    .then((db) => db.collection(col)
      .updateOne(
        { _id: ObjectId(id) },
        { $set: { itensSold: [...sale] } },
      )
      .then((result) => result));
    
  // const result = await getSaleById(id);

  // return result;
};

const deleteSale = async (id) => {
  const result = await getSaleById(id);
  connection()
    .then((db) => db.collection(col)
      .deleteOne({ _id: ObjectId(id) }));

  return result;
};

module.exports = {
  getAllSales,
  getSaleById,
  createSale,
  updateSale,
  deleteSale,
};