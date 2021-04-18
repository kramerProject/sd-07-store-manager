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
};
