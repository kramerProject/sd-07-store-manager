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

module.exports = {
  getAll,
  getById,
  createSale
};
