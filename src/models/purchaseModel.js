const getConnection = require('./connection');
const { ObjectId } = require('mongodb');

const getOnePurch = async (id) => {
  const connection = await getConnection();
  try {
    const purchase = await connection.collection('sales')
      .findOne({ _id: ObjectId(id)});
    return purchase;
  } catch (err) {
    console.log(err);
    return { error: err , result: { ok: false } };
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
    console.log('MODEL line 34: ', err)
    return { error: err , result: { ok: false } };
  }
};

module.exports = {
  getOnePurch,
  getPurchaseList,
  insertPurchase,
};
