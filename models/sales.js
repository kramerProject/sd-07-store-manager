const connection = require('./connection');

const { ObjectId } = require('mongodb');

const getAll = async () => {
  return await connection().then((db) => db.collection('sales').find().toArray());
};

const getById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  return await connection().then((db) => db.collection('sales').findOne(ObjectId(id)));
};

const getByName = async (string) => {
  return await connection().then((db) => db.collection('sales')
    .findOne({ name: string }));
};

const postdata = async (sales) => {
  const sale = await connection().then((db) =>
    db.collection('sales').insertOne({ itensSold: sales }),
  );

  return { _id: sale.insertedId, itensSold: sales };
};

const editdata = async (id, sale) => {
  await connection().then((db) =>
    db.collection('sales')
      .updateOne({ _id: ObjectId(id) }, { $set: { itensSold: sale } }),
  );

  const result = {
    _id: id,
    itensSold: sale,
  };
  return result;
};

const deletedata = async (sale) => {
  const { _id } = sale;
  await connection().then((db) => {
    db.collection('sales').deleteOne({ _id });
  });
  return sale;
};

module.exports = {
  getAll,
  getById,
  getByName,
  postdata,
  editdata,
  deletedata,
};
