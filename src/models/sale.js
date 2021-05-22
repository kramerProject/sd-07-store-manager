const { ObjectId } = require('bson');
const connection = require('./connection');

const getAll = async () =>
  connection().then ((db) => db.collection('sales').find().toArray());

const getOne = async (id) =>
  connection().then ((db) => db.collection('sales').findOne(ObjectId(`${id}`)));

const create = async (soldProducts) =>
  connection()
    .then ((db) => db
      .collection('sales')
      .insertOne({ itensSold: [...soldProducts] }
      )
    );

const update = async (id, soldProducts) => {
  connection().then ((db) => db.collection('sales').updateOne(
    { _id: ObjectId(id) },
    { $set: { itensSold: [...soldProducts] } } )
  );
  return {
    _id: id,
    itensSold: soldProducts
  };
};

const exclude = async (id) => {
  const item = getOne(id);
  connection().then ((db) => db.collection('sales').deleteOne(
    {
      _id: ObjectId(`${id}`)
    }
  ));
  return item;
};

module.exports = {
  getAll,
  getOne,
  create,
  update,
  exclude,
};