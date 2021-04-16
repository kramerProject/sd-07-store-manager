const connect = require('../config/connn');
const { ObjectId } = require('mongodb');
// querys criadas com auxilio dos exercicios feitos na aula do Lucas Cavalcante 27.3

const add = async ( itensSold ) => {
  const sale = await connect().then((db) =>
    db
      .collection('sales')
      .insertOne({ itensSold })
  );

  return { _id: sale.insertedId, itensSold };
};

const getAll = async () =>
  connect()
    .then((db) => db.collection('sales').find().toArray());

const getById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const sale = await connect()
    .then((db) => db.collection('sales').findOne({ _id: ObjectId(id) }));
  return sale;
};

const update = async (id, itensSold) => {
  if (!ObjectId.isValid(id)) return null;

  const sales = await connect().then((db) =>
    db
      .collection('sales')
      .updateOne({ _id: ObjectId(id) }, { $set: { itensSold } })
  );
  return { id, itensSold };
};

const exclude = async(id) => {
  connect().then( async (db) => {
    db.collection('sales').deleteOne({ _id: ObjectId(id) });
  });
};

module.exports = {
  getAll,
  getById,
  add,
  update,
  exclude
};