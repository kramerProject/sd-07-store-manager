const saleModel = require('../models/SaleModel');
const { numbers } = require('../helpers/Numbers');
const { messageSuccess, messageError } = require('../helpers/MessageResponse');
const { ObjectId } = require('mongodb');

module.exports = {
  async create(sales) {
    for (let index = numbers.ZERO; index < sales.length; index += numbers.UM) {
      if (parseInt(sales[index].quantity) <= numbers.ZERO) {
        return messageError('Wrong product ID or invalid quantity');
      }
      if (isNaN(parseInt(sales[index].quantity))) {
        return messageError('Wrong product ID or invalid quantity');
      }
    }
    const salesCreated = await saleModel.create(sales);
    return messageSuccess({ _id: salesCreated.insertedId, itensSold: sales });
  },
  async getAll() {
    const sales = await saleModel.getAll();
    return sales.toArray();
  },
  async findById(id) {
    if (!ObjectId.isValid(id) || id.length !== numbers.VINTE_QUATRO) {
      return messageError('Sale not found', 'not_found');
    }

    const sales = await saleModel.getById(id);
    return messageSuccess(sales);
  },
  async update(id, sales) {
    for (let index = numbers.ZERO; index < sales.length; index += numbers.UM) {
      if (parseInt(sales[index].quantity) <= numbers.ZERO) {
        return messageError('Wrong product ID or invalid quantity');
      }
      if (isNaN(parseInt(sales[index].quantity))) {
        return messageError('Wrong product ID or invalid quantity');
      }
    }
    await saleModel.update(id, sales);
    return messageSuccess({ _id: id, itensSold: sales });
  }
};
