const connection = require('../database/connection');

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
  }
};
