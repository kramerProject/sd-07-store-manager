const connection = require('../config/conn');
const { ObjectId } = require('mongodb');

const validationFail = (body) => {
  const minQuantity = 0;
  if (body.every((sale) => typeof sale.quantity !== 'number')) {
    return 'Wrong product ID or invalid quantity';
  };
  if (body.every((sale) => sale.quantity <= minQuantity)) {
    return 'Wrong product ID or invalid quantity';
  };
  return undefined;
};

const createSales = async (body) => {
  const validationsFail = await validationFail(body);
  if (validationsFail != undefined) throw new Error(validationsFail);

  await connection().then((db) => db.collection('sales').insertMany(body));

  return { _id: body[0].productId, itensSold: body };
};

module.exports = { createSales };