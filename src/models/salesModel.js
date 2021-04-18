const connection = require('../../config/conn');

const { ObjectId } = require('mongodb');

const create = async (itensSold) => {
  const saleCreated = await connection()
    .then(db => db.collection('sales')
      .insertOne({ itensSold }));
  return saleCreated.ops[0];
};

const getAll = async () => {
  return await connection()
    .then(db => db.collection('sales').find().toArray());
};

const getById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  return await connection().then(db => 
    db.collection('sales').findOne(ObjectId(id))
  );
};

const update = async (id, itensSold) => {
  const saleUpdated = await connection().then(db =>
    db.collection('sales')
      .updateOne({ _id: ObjectId(id) }, { $set: { itensSold } }));
  return { _id: id, itensSold };
};

const exclude = async (id) => {
  return await connection().then(db => {
    db.collection('sales').deleteOne({ _id: ObjectId(id) });
  });
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  exclude
};