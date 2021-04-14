const connection = require('../config/conn');
const { ObjectId } = require('mongodb');


const getAll = async ()   => {
  return await connection().then((db) => db.collection('sales').find().toArray());
};

const getById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  return await connection().then((db) => db.collection('sales').findOne(ObjectId(id)));
};

const create = async (salesArr) => {
  const sale = await connection().then((db) =>
    db.collection('sales').insertMany(salesArr));

  return {
    _id: sale.insertedId,
    itensSold: salesArr,
  };
};

const update = async (id, itensSold) =>  {
  if (!ObjectId.isValid(id)) return null;
  await connection().then(async (db) =>  {
    await db.collection('sales')
      .updateOne(        
        {_id: ObjectId(id)},
        {
          $push: {
            'itensSold': {
              $each: itensSold
            }
          }
        },
      );

    return { _id: id, itensSold: itensSold};
  });  
};

const exclude = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  return await connect().then(
    async (db) => await db.collection('sales').deleteOne({_id: ObjectId(id)})
  );  
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  exclude,
};
