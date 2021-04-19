const getConnection = require('./connection');
const { ObjectId } = require('mongodb');

const BAD_INPUT = 'Unprocessable Entity';

const getOnePurch = async (id) => {
  const connection = await getConnection();
  try {
    const purchase = await connection.collection('sales')
      .findOne({ _id: ObjectId(id)});
    return { purchse: purchase, status: 'OK' };
  } catch (err) {
    return { error: err , status: BAD_INPUT};
  }
};

const insertPurchase = async (productList) => {
  const connection = await getConnection();
  try {
    const purchaseInsertionRes = await connection.collection('sales')
      .insertOne({ itensSold: productList });
    return purchaseInsertionRes.ops;
  } catch (err) {
    console.log(err);
    return err;
  }
};

const getPurchaseList = async () => {
  const connection = await getConnection();
  try {
    const purchaseList = await connection.collection('sales').find().toArray();
    return purchaseList;
  } catch (err) {
    return { error: err , result: { ok: false } };
  }
};

const updtPurch = async (id, pdtList) => {
  const connection = await getConnection();
  try {
    const { productId, quantity } = pdtList;
    const purchUpdated = await connection.collection('sales')
      .updateOne({ _id: ObjectId(id) }, {$set: {
        productId, quantity
      }});
    return purchUpdated.result;
  } catch (err) {
    console.log(err);
    return { error: err };
  }
};

module.exports = {
  getOnePurch,
  getPurchaseList,
  insertPurchase,
  updtPurch,
};
