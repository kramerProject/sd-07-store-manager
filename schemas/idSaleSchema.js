const { ObjectId } = require('bson');
const service = require('../services/saleService');
const {notFound, unprocessableEntity} = require('../messages/messageCodes');
const {invalidData, notSale, notFoundSale, wrongIdSale, GET} = require('../messages');
const {objectError} = require('../helpers');
const findBySaleId = async (id, method) => {

  let codeHttp = unprocessableEntity;
  let textCode = invalidData;
  let textMessage = wrongIdSale;

  if (method === GET) {
    codeHttp = notFound;
    textCode = notFoundSale;
    textMessage = notSale;
  }

  if (!ObjectId.isValid(id)) return {
    code: codeHttp,
    message: objectError(textCode, textMessage)
  };

  const sale = await service.findBySaleId(id);

  if (!sale) return {
    code: notFound,
    message: objectError(notFoundSale, notSale)
  };

  return sale;
};

module.exports = {
  findBySaleId,
};
