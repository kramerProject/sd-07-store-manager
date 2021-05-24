const connection = require('../db/connection');

const { connect } = require('./Model');
const { ObjectId } = require('mongodb');

module.exports = {
  async create(sales) {
    return await connect('sales', 'insertOne', { itensSold: sales });
  },
  async getAll() {
    return await connect('sales', 'find', {});
  },
  async getById(id) {
    return await connect('sales', 'findOne', ObjectId(id));
  },
  async update(id, sales) {
    const db = await connection();

    return await db.collection('sales').updateOne(
      { _id: ObjectId(id) },
      { $set: { itensSold: sales } },
    );
  },
  async delete(id) {
    return await connect('sales', 'deleteOne', { _id: ObjectId(id) });
  }
};
