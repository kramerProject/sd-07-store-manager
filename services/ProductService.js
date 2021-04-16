const ProductModel = require('../models/Product');
const helper = require('../helpers/isValid');
const validations = require('../helpers/validations');
const { ObjectId } = require('bson');

const getAll = async () => {
  const products = await ProductModel.getAll();
  return products;
};

const create = async (name, quantity) => {
  const products = await getAll();

  // const validator = validations(name, quantity);

  const alreadyIncluded = await helper.productExist(products, name);
  const nameType = helper.nameIsAString(name);
  const nameLength = helper.nameIsOk(name);
  const quantityLength = helper.quantityIsOk(quantity);
  const quantityIsInteger = helper.IsInteger(quantity);

  if (alreadyIncluded.code) return alreadyIncluded;
  if (nameLength.code) return nameLength;
  if (quantityIsInteger.code) return quantityIsInteger;
  if (nameType.code) return nameType;
  if (quantityLength.code) return quantityLength;
  // if (validator.code) return validator;
  
  const product = await ProductModel.create(name, quantity);

  return product;
};

const findById = async (id) => {
  const products = await getAll();

  const iDsearch = await helper.searcIdcontent(products, id);

  if (iDsearch.code) {
    return iDsearch;
  }

  const product = await ProductModel.findById(id);
  return product;
};

const update = async (id, name, quantity) => {

  const nameType = helper.nameIsAString(name);
  const nameLength = helper.nameIsOk(name);
  const quantityLength = helper.quantityIsOk(quantity);
  const quantityIsInteger = helper.IsInteger(quantity);

  if (nameLength.code) return nameLength;
  if (quantityIsInteger.code) return quantityIsInteger;
  if (nameType.code) return nameType;
  if (quantityLength.code) return quantityLength;

  const product = await ProductModel.update(id, name, quantity);

  return product;
};

const exclude = async (id) => {
  const products = await getAll();
  const iDsearch = await helper.searcIdcontent(products, id);

  if (!iDsearch.code) {
    return iDsearch;
  }
  
  const product = await ProductModel.exclude(id);
  return product;
};

module.exports = {
  getAll,
  create,
  findById,
  update,
  exclude
};