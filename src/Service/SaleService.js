const saleModel = require('../Models/SaleModel');
const productController = require('../Controllers/ProductsController');
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
      const request = {params: {id: sales[index].productId}};
      const product = await productController.findById(request);
      const quantity = product.quantity - sales[index].quantity;
      request['body'] = {name: product.name, quantity};
      await productController.update(request);
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
    if (!sales) {
      return messageError('Sale not found', 'not_found');
    }
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
  },
  async delete(id) {
    if (!ObjectId.isValid(id) || id.length !== numbers.VINTE_QUATRO) {
      return messageError('Wrong sale ID format');
    }
    const salesById = await saleModel.getById(id);
    const request = {params: {id: salesById.itensSold[0].productId}};
    const product = await productController.findById(request);
    const quantity = product.quantity + salesById.itensSold[0].quantity;
    request['body'] = {name: product.name, quantity};
    await productController.update(request);



    await saleModel.delete(id);
    return messageSuccess(salesById);
  }
};
