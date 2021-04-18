const { connect } = require('./Model');

module.exports = {
  async create(sales) {
    return await connect('sales', 'insertOne', { itensSold: sales });
  }
};
