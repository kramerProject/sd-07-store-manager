const { ObjectId } = require('mongodb');
const connection = require('./connection');

const addSale = async (itensSold) => {
  const { insertedId } = await connection()
    .then((db) => db.collection('sales').insertOne({ itensSold }));

  return ({
    _id: insertedId,
    itensSold
  });
};

const getAll = async () => {
  return await connection().then((db) => db.collection('sales').find().toArray());
};

const getById = async (id) => {
  return await connection().then((db) => db.collection('sales').findOne(ObjectId(id)));
};

const updateSale = async (id, itensSold) => {
  await connection()
    .then((db) => db.collection('sales').updateOne(
      { _id: ObjectId(id) },
      {
        $set: {
          itensSold
        }
      }
    ));

  return ({
    _id: id,
    itensSold
  });
};

const deleteSale = async (id) => {
  const deletedSale = await getById(id);

  await connection()
    .then((db) => db.collection('sales').deleteOne({ _id: new ObjectId(id) }));

  return deletedSale;
};

module.exports = {
  addSale,
  getAll,
  getById,
  updateSale,
  deleteSale
};
