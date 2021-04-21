const { ObjectId } = require('bson');
const service = require('../services/saleService');
const {notFound} = require('../messages/messageCodes');
const {notSale, notFoundSale} = require('../messages');
const {objectError} = require('../helpers');
const findBySaleId = async (id) => {

  if (!ObjectId.isValid(id)) return {
    code: notFound,
    message: objectError(notFoundSale, notSale)
  };

  const sale = await service.findBySaleId(id);

  if (!sale) return { code: notFound, message: objectError(notFoundSale, notSale)};

  return sale;
};

module.exports = {
  findBySaleId,
};
