const productModel = require('../models/ProducModel');
const { validateFields } = require('../helpers/validateFields');
const { messageSuccess, messageError } = require('../helpers/MessageResponse');
const { ObjectId } = require('mongodb');
const { numbers } = require('../helpers/Numbers');

module.exports = {
  async create({ name, quantity }) {
    const result = validateFields(name, quantity);
    if (result.status === 'failure') {
      return result;
    }
    const productExists = await productModel.getByName(name);
    if (productExists) {
      return messageError('Product already exists');
    }
    const product = await productModel.create({ name, quantity });
    return messageSuccess(product.ops[0]);
  },
  async getAll() {
    const products = await productModel.getAll();
    return products.toArray();
  },
  async getById(id) {
    if (!ObjectId.isValid(id) || id.length !== numbers.VINTE_QUATRO) {
      return messageError('Wrong id format');
    }
    const productExists = await productModel.getById(id);
    if (!productExists) {
      return messageError('Wrong id format');
    }
    const product = await productModel.getById(id);
    return messageSuccess(product);
  },
  async update(id, { name, quantity }) {
    const result = validateFields(name, quantity);
    if (result.status === 'failure') {
      return result;
    }
    const { insertedId } = await productModel.update(id, { name, quantity });
    return messageSuccess({ _id: insertedId, name, quantity });
  },
  async delete(id) {
    if (!ObjectId.isValid(id) || id.length !== numbers.VINTE_QUATRO) {
      return messageError('Wrong id format');
    }
    const productExists = await productModel.getById(id);
    if (!productExists) {
      return messageError('Wrong id format');
    }
    const product = await productModel.getById(id);
    await productModel.delete(id);
    return messageSuccess(product);
  }
};
