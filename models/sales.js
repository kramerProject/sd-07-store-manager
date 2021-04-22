const { ObjectId } = require('bson');
const connection = require('./connection');

const createSale = async (sales) => {
  const newSale = {
    itensSold: sales,
  };
  await connection().then((db) => {
    db.collection('sales').insertOne(newSale);
  });
  return await connection().then((db) => db.collection('sales').find(newSale).toArray());
};

const getAllSales = async () => {
  const allSales = await connection().then((db) => {
    return db.collection('sales').find().toArray();
  });
  return allSales;
};

const getSaleById = async (id) => {
  return await connection()
    .then((db) => {
      return db
        .collection('sales')
        .find({ _id: ObjectId(id) })
        .toArray();
    })
    .catch((rej) => {
      return false;
    });
};

const updateSale = async (id, itensSold) => {
  await connection().then((db) => {
    db.collection('sales').updateOne(
      { _id: ObjectId(id) },
      {
        $set: {
          itensSold,
        },
      },
    );
  });
  return connection().then((db) =>
    db
      .collection('sales')
      .find({ _id: ObjectId(id) })
      .toArray(),
  );
};

const deleteSale = async (id) => {
  return await connection()
    .then(async (db) => {
      const target = await db
        .collection('sales')
        .find({ _id: ObjectId(id) })
        .toArray();
      await connection().then((db) => {
        db.collection('sales').deleteOne({ _id: ObjectId(id) });
      });
      return target;
    })
    .catch((rej) => {
      return false;
    });
};

module.exports = { createSale, getAllSales, getSaleById, updateSale, deleteSale };
