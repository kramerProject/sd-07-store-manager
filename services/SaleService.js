const saleModel = require('../models/SaleModel');
const { numbers } = require('../helpers/Numbers');
const { messageSuccess, messageError } = require('../helpers/MessageResponse');
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
  }
};
