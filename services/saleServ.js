const saleModel = require('../models/saleModel');
const productModel = require('../models/productModel');
const errMessage = require('./serializeErrorMessage');

var checkForHexRegExp = new RegExp('^[0-9a-fA-F]{24}$');
const UNPROCESSABLE_ENTRY = 422;
const NOT_FOUND = 404;

const message = 'Wrong product ID or invalid quantity';
const zero = 0;

const add = async (itensSoldArray) => {
  for (let index = zero; index < itensSoldArray.length; index++) {
    if (
      !Number.isInteger(itensSoldArray[index].quantity) ||
      itensSoldArray[index].quantity <= zero ||
      !checkForHexRegExp.test(itensSoldArray[index].productId)
    )
      return errMessage(
        'invalid_data',
        message,
        UNPROCESSABLE_ENTRY,
      );

    const doesProductWithIdExists = await productModel.getById(
      itensSoldArray[index].productId,
    );

    if (!doesProductWithIdExists)
      return errMessage(
        'invalid_data',
        message,
        UNPROCESSABLE_ENTRY,
      );
  }
  const resp = await saleModel.add(itensSoldArray);
  return resp;
};

const getById = async (id) => {
  if (!checkForHexRegExp.test(id))
    return errMessage('not_found', 'Sale not found', NOT_FOUND);
  const doesSaleWithIdExists = await saleModel.getById(id);
  if (!doesSaleWithIdExists) return errMessage('not_found', 'Sale not found', NOT_FOUND);
  return doesSaleWithIdExists;
};

const edit = async (idSale, itensSoldArray) => {
  if (!checkForHexRegExp.test(idSale))
    return errMessage(
      'invalid_data',
      message,
      UNPROCESSABLE_ENTRY,
    );
  for (let index = zero; index < itensSoldArray.length; index++) {
    if (
      !Number.isInteger(itensSoldArray[index].quantity) ||
      itensSoldArray[index].quantity <= zero
    )
      return errMessage(
        'invalid_data',
        message,
        UNPROCESSABLE_ENTRY,
      );

    const doesProductWithIdExists = await productModel.getById(
      itensSoldArray[index].productId,
    );
    if (!doesProductWithIdExists)
      return errMessage(
        'invalid_data',
        message,
        UNPROCESSABLE_ENTRY,
      );
  }
  const attItem = await saleModel.edit(idSale, itensSoldArray);
  return attItem.ok
    ? { _id: idSale, itensSold: itensSoldArray }
    : errMessage(
      'invalid_data',
      message,
      UNPROCESSABLE_ENTRY,
    );
};

const del = async (idSale) => {
  if (!checkForHexRegExp.test(idSale))
    return errMessage('invalid_data', 'Wrong sale ID format', UNPROCESSABLE_ENTRY);
  const wasSaleDeleted = await saleModel.del(idSale);
  return wasSaleDeleted.value
    ? wasSaleDeleted.value
    : errMessage('invalid_data', 'Wrong sale ID format', UNPROCESSABLE_ENTRY);
};

module.exports = { add, getById, edit, del };
