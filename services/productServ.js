const productModel = require('../models/productModel');
const errMessage = require('./serializeErrorMessage');

var checkForHexRegExp = new RegExp('^[0-9a-fA-F]{24}$');

const UNPROCESSABLE_ENTRY = 422;

const message = 'Wrong id format';

const zero = 0;
const five = 5;

const validateNameQuantity = (name, quantity) => {
  if (name.length < five)
    return errMessage(
      'invalid_data',
      '"name" length must be at least 5 characters long',
      UNPROCESSABLE_ENTRY,
    );
  if (!Number.isInteger(quantity))
    return errMessage('invalid_data', '"quantity" must be a number', UNPROCESSABLE_ENTRY);
  if (quantity <= zero)
    return errMessage(
      'invalid_data',
      '"quantity" must be larger than or equal to 1',
      UNPROCESSABLE_ENTRY,
    );
  return { status: 'OK' };
};

const add = async (name, quantity) => {
  const isValid = validateNameQuantity(name, quantity);

  if (isValid.err) {
    return isValid;
  }
  const isNameAlreadyRegistered = await productModel.getByName(name);
  if (isNameAlreadyRegistered)
    return errMessage('invalid_data', 'Product already exists', UNPROCESSABLE_ENTRY);

  const resp = await productModel.add(name, quantity);
  return resp;
};

const getAll = async () => {
  const elements = await productModel.getAll();
  return { products: elements };
};

const getById = async (id) => {
  if (!checkForHexRegExp.test(id))
    return errMessage('invalid_data', message, UNPROCESSABLE_ENTRY);
  const element = await productModel.getById(id);
  if (!element) return errMessage('invalid_data', message, UNPROCESSABLE_ENTRY);
  return element;
};

const edit = async (name, quantity, id) => {
  const isValid = validateNameQuantity(name, quantity);

  if (isValid.err) {
    return isValid;
  }

  const editedElement = await productModel.edit(name, quantity, id);
  // { acknowledged: true,
  //   insertedId: null,
  //   matchedCount: 1,
  //   modifiedCount: 1,
  //   upsertedCount: 0 }
  if (editedElement.modifiedCount != 1)
    return errMessage('invalid_data', message, UNPROCESSABLE_ENTRY);

  return { _id: id, name, quantity };
};

const del = async (id) => {
  if (!checkForHexRegExp.test(id))
    return errMessage('invalid_data', message, UNPROCESSABLE_ENTRY);

  const deletedElement = await productModel.del(id);

  if (!deletedElement)
    return errMessage('invalid_data', message, UNPROCESSABLE_ENTRY);

  return deletedElement;
};

module.exports = { add, getAll, getById, edit, del };
