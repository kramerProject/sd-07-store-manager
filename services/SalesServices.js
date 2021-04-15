const SalesModels = require('../models/SalesModels');

const {
  compare,
  status,
  message,
  greaterThan,
  mustBeNumber,
  responseWith,
  responseWithNotFound,
} = require('./Helpers');

const registerSale = async (request, response) => {
  const itensSold = request.body;

  itensSold.map((item) => {
    if(greaterThan(item.quantity, compare.zeroQuantity) ||
      mustBeNumber(item.quantity)) {
      return responseWith(status.code422, message.invalidyQuantity, response);
    }
  });

  const registeredSale = await SalesModels.registerSale(itensSold);

  return response.status(status.code200).json(registeredSale);

};

const getAllSales = async (request, response) => {
  const allSales = await SalesModels.getAllSales();

  return response.status(status.code200).json({ sales: allSales });
};

const getById = async (request, response) => {
  const { id } = request.params;
  const idNotExists = !id;
  const idNotHexObjectId = (id.length !== compare.hexObjectedId);

  if (idNotExists || idNotHexObjectId) {
    return responseWithNotFound(response);
  }

  const saleFound = await SalesModels.getById(id);

  if (!saleFound) {
    return responseWithNotFound(response);
  }

  return response.status(status.code200).json(saleFound);
};

const updateSale = async (request, response) => {
  const { id } = request.params;
  const idNotHexObjectId = (id.length !== compare.hexObjectedId);
  const itensSold = request.body;

  if (idNotHexObjectId) {
    responseWith(status.code422, message.invalidyQuantity, response);
  }

  itensSold.map((item) => {
    switch (true) {
    case greaterThan(item.quantity, compare.zeroQuantity):
      responseWith(status.code422, message.invalidyQuantity, response);
    case mustBeNumber(item.quantity):
      responseWith(status.code422, message.invalidyQuantity, response);
    default:
      break;
    }
  });

  await SalesModels.updateSale(id, itensSold);
  response.status(status.code200).json({ _id: id, itensSold });
};

module.exports = {
  registerSale,
  getAllSales,
  getById,
  updateSale,
};
