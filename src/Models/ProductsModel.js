const { connect } = require('./Model');

async function getByName(name) {
  return await connect('products', 'findOne', { name });
}

async function create(data) {
  return await connect('products', 'insertOne', data);
}

async function getAll() {
  return await connect('products', 'find', {});
}

module.exports = { create, getAll, getByName };
