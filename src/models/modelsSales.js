const { ObjectId } = require('mongodb');
const connection = require('./database/connection');

const create = async (sale) =>
  await connection()
    .then((db) => db.collection('sales').insertOne({ sale }))
    .then((result) => ({ _id: result.insertedId, sale }));

module.exports = {
  create,
/*   getAll,
  getById,
  updateById,
  excludeById */
};
