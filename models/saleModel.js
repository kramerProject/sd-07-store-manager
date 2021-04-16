const connection = require('../config/conn');

const { ObjectId } = require('mongodb');

const createSale = async (itemsSold) => {
  const validateIds = itemsSold.some((product) => !ObjectId.isValid(product.productId));
  if (validateIds) return null;
  const sale = await connection().then((db) =>
    db.collection('sales').insertOne({ itemsSold: [ ...itemsSold ] }),
  );
  return { _id: sale.insertedId, itensSold: itemsSold };
};

module.exports = {
  createSale
};
