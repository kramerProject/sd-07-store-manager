const connection = require('../database/connection');
const { ObjectId } = require('mongodb');
const { connect } = require('./Model');

module.exports = {
  async create(data) {
    return await connect('products', 'insertOne', data);
  },
  async getByName(name) {
    return await connect('products', 'findOne', { name });
  },
  async getAll() {
    return await connect('products', 'find', {});
  },
  async getById(id) {
    return await connect('products', 'findOne', ObjectId(id));
  },
  async update(id, { name, quantity }) {
    const db = await connection();

    return await db.collection('products').updateOne(
      { _id: ObjectId(id) },
      { $set: { name, quantity } },
    );
  },
  async delete(id) {
    return await connect('products', 'deleteOne', { _id: ObjectId(id) });
  }
};
