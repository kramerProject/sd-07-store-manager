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

const getAllSales = async () => {
  const response = await connection().then((db) => db.collection('sales')
    .find().toArray());
  return { _id: response[0].productId, itensSold: response };
};

const getSalesById = async (id) => {
  const response = await connection().then((db) => db.collection('sales')
    .findOne(ObjectId(id)));
  
  if (!ObjectId.isValid(id) === false) throw new Error('Sale not found');
  if (response === null) throw new Error('Sale not found');

  return { _id: response[0].productId, itensSold: response };
};

const updateSales = async (id, body) => {
  const validationsFail = await validationFail(body);
  if (validationsFail != undefined) throw new Error(validationsFail);

  await connection().then((db) => db.collection('sales')
    .updateOne({ _id: ObjectId(id) }, { $set: {
      'productId': body[0].productId,
      'quantity': body[0].quantity
    } })
  );

  return { _id: id, itensSold: body };
};

module.exports = { createSales, getAllSales, getSalesById, updateSales };