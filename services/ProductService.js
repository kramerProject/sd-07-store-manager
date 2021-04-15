const Product = require('../models/Product');
const helper = require('../helpers/isValid');

const getAll = async () => {
  const products = await Product.getAll();
  return products;
};

const create = async (name, quantity) => {
  const products = await getAll();

  const nameType = helper.nameIsAString(name);
  const nameLength = helper.nameIsOk(name);
  const alreadyIncluded = await helper.productExist(products, name);
  const quantityLength = helper.quantityIsOk(quantity);
  const quantityIsInteger = helper.IsInteger(quantity);

  if (alreadyIncluded.code) return alreadyIncluded;

  if (nameLength.code) return nameLength;

  if (quantityIsInteger.code) return quantityIsInteger;

  if (nameType.code) return nameType;

  if (quantityLength.code) return quantityLength;
  
  const product = await Product.create(name, quantity);

  return product;
};

const findById = async (id) => {
  const products = await getAll();

  const iDsearch = await helper.searcIdcontent(products, id);

  if (iDsearch.code) {
    return iDsearch;
  }

  const product = await Product.findById(id);
  return product;
};

module.exports = {
  getAll,
  create,
  findById
};