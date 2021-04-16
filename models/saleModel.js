const connection = require('../config/conn');

const { ObjectId } = require('mongodb');

const getAll = async () => {
  return connection()
    .then((db) => db.collection('sales').find().toArray());
};


const getById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  return connection().then((db) => db.collection('sales').findOne(ObjectId(id)));
};

const createSale = async (itemsSold) => {
  const validateIds = itemsSold.some((product) => !ObjectId.isValid(product.productId));
  if (validateIds) return null;
  const sale = await connection().then((db) =>
    db.collection('sales').insertOne({ itensSold: [ ...itemsSold ] }),
  );
  return { _id: sale.insertedId, itensSold: itemsSold };
};

const updateSale = async (id, itemsSold) => {
  if (!ObjectId.isValid(id)) return null;

  const product = await connection().then((db) =>
    db.collection('sales').updateOne(
      { _id: ObjectId(id) }, { $set: { itensSold: [ ...itemsSold ] } }),
  );
  return { _id: id, itensSold: itemsSold };
};


module.exports = {
  getAll,
  getById,
  createSale,
  updateSale
};
