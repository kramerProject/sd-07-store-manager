const productsModel = require('../models/productsModel');
const connect = require('../config/conn');
const { ObjectId } = require('mongodb');

const addAfter = async (sales) =>
  connect().then(async (db) => {
    const itensSold = await db.collection('sales').insertOne({ itensSold: sales });
    return itensSold.ops[0];
  });

const add = async (sales) => {
  const zero = 0;
  for (let i = zero; i < sales.length; i += 1) {
    const { productId, quantity } = sales[i];
    await productsModel.updateQuantity(productId, quantity, 'sale');
  }

  const itensSold = await addAfter(sales);
  return itensSold;

  // connect().then(async (db) => {
  //   const itensSold = await db.collection('sales').insertOne({ itensSold: sales });
  //   console.log('model' + itensSold.ops[0]);
  //   return itensSold.ops[0];
  // });
};

const getAll = async () =>
  connect().then(async (db) => await db.collection('sales').find().toArray());

const getOne = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  return connect().then((db) => db.collection('sales').findOne(ObjectId(id)));
};

const updateOne = async (id, itensSold) =>
  connect().then(async (db) => {
    await db.collection('sales')
      .updateOne({ _id: ObjectId(id) }, { $set: { itensSold } });

    return {
      _id: id,
      itensSold,
    };
  });

const exclude = async (id) => {
  const sale = await getOne(id);
  const sales = sale.itensSold;
  const zero = 0;
  for (let i = zero; i < sales.length; i += 1) {
    const { productId, quantity } = sales[i];
    await productsModel.updateQuantity(productId, quantity, 'devolution');
  }

  connect().then(async (db) => db.collection('sales').deleteOne({ _id: ObjectId(id) }));

  return {
    _id: id,
    itensSold: sale.itensSold,
  };
};

module.exports = {
  add,
  getAll,
  getOne,
  updateOne,
  exclude,
};

// { "_id": ObjectId("5f43cbf4c45ff5104986e81d"), "name": "Produto Silva", "quantity": 10 }

//  {
//    "_id": ObjectId("5f43cc53c45ff5104986e81e"),
//    "itensSold": [{ "productId": "5f43cbf4c45ff5104986e81d", "quantity": 2 }]
//  }
