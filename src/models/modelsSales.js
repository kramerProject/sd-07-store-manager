const { ObjectId } = require('mongodb');
const connection = require('./database/connection');

const create = async (itensSold) =>
  await connection()
    .then((db) => db.collection('sales').insertOne({ itensSold }))
    .then((result) => ({ _id: result.insertedId, itensSold }));

module.exports = {
  create,
/*   getAll,
  getById,
  updateById,
  excludeById */
};
