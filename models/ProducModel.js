const connection = require('../database/connection');
const { ObjectId } = require('mongodb');

const connect = async (command, params) => {
  try {
    const db = await connection();

    return await db.collection('products')[command](params);
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  async create(data) {
    return await connect('insertOne', data);
  },
  async getByName(name) {
    return await connect('findOne', { name });
  },
  async getAll() {
    return await connect('find', {});
  },
  async getById(id) {
    return await connect('findOne', ObjectId(id));
  },
  async update(id, { name, quantity }) {
    const db = await connection();

    return await db.collection('products').updateOne(
      { _id: ObjectId(id) },
      { $set: { name, quantity } },
    );
  },
  async delete(id) {
    return await connect('deleteOne', { _id: ObjectId(id) });
  }
};
