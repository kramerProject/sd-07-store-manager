const connection = require('../connection');
const { validations } = require('./saleErrors');
const { ObjectId } = require('mongodb');

const addSale = async (body) => {
  const isNotValid = validations(body);
  if (isNotValid) throw new Error('Wrong product ID or invalid quantity');

  await connection().then((db) => db.collection('sales').insertMany(body));

  return { _id: body[0].productId, itensSold: body };
};

const getAllSales = async () => {
  const sold = await connection().then((db) => db.collection('sales').find({}).toArray());
  
  return { _id: sold[0].productId, itensSold: sold };
};

const getSaleById = async (id) => {
  if (!ObjectId.isValid(id)) throw new Error('Sale not found');

  const sold = await connection().then((db) => 
    db.collection('sales').findOne(ObjectId(id)));

  return { _id: sold[0].productId, itensSold: sold };
};

const uptadeSale = async (id, body) => {
  const isNotValid = validations(body);
  if (isNotValid) throw new Error('Wrong product ID or invalid quantity');

  await connection().then((db) => db.collection('sales')
    .updateOne({ _id: ObjectId(id) },
      { $set: { 'productId': body[0].productId, 'quantity': body[0].quantity } })
  );

  return { _id: id, itensSold: body };
};

const deleteSale = async (id) => {
  if (!ObjectId.isValid(id)) throw new Error('Wrong sale ID format');

  return await connection().then((db) => {
    return db.collection('sales').deleteOne({ _id: ObjectId(id) });
  });
};

module.exports = {
  addSale,
  getAllSales,
  getSaleById,
  uptadeSale,
  deleteSale
};
