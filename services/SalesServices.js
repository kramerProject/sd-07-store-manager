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

    // switch(true) {
    // case greaterThan(item.quantity, compare.zeroQuantity):
    //   return responseWith(status.code422, message.invalidyQuantity, response);
    // case mustBeNumber(item.quantity):
    //   return responseWith(status.code422, messsage.invalidyQuantity, response);
    // default:
    //   break;
    // }
  });

  const registeredSale = await SalesModels.registerSale(itensSold);

  return response.status(status.code200).json(registeredSale);

};

module.exports = {
  registerSale,
};
