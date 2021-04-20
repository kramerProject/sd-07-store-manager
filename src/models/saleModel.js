const { ObjectId } = require('bson');
const conn = require('../../config/conn');

const postSales = async (sales) => {
  const sale = await conn().then((db) =>
    db.collection('sales').insertOne({ itensSold: sales }));

  return { _id: sale.insertedId, itensSold: sales };
};

const getAllSales = async () => await conn()
  .then((db) =>
    db.collection('sales')
      .find()
      .toArray());

const getSaleById = async (id) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  return await conn()
    .then((db) =>
      db.collection('sales')
        .findOne(new ObjectId(id)));
};

// source: https://github.com/tryber/sd-07-store-manager/blob/ANDREHORMAN-STORE-MANAGER/src/models/salesModel.js
const updateSale = async (id, productId, quantity) => {
  const sale = await conn().then((db) => {
    return db
      .collection('sales')
      .updateOne(
        { _id: ObjectId(id) },
        { $set: { itensSold: [{ productId, quantity }] } }
      );
  });
  return sale;
};

const deleteSale = async (id) => {
  const sale = await conn().then((db) => {
    return db
      .collection('sales')
      .deleteOne(
        { _id: ObjectId(id) },
      );
  });
  return sale;
};

module.exports = {
  postSales,
  getAllSales,
  getSaleById,
  updateSale,
  deleteSale,
};
