const { ObjectId } = require('mongodb');
const salesModel = require('../model/salesModel.js');
const { wrongIdOrQuantityError, saleNotFoundError } = require('../errors/errors.js');
const productsModel = require('../model/productsModel');


const verifySale = async (productId, quantity) => {
  const noSenseStock = 0;
  const result = await productsModel.findById(new ObjectId(productId));
  console.log(result);
  if(!result) 
    throw new Error(JSON.stringify(wrongIdOrQuantityError));
  if(quantity <= noSenseStock)
    throw new Error(JSON.stringify(wrongIdOrQuantityError));
  if (typeof quantity !== 'number') 
    throw new Error(JSON.stringify(wrongIdOrQuantityError));
};
const verifyId = async (id) => {
  if (!ObjectId.isValid(id)) throw new Error((JSON.stringify(saleNotFoundError)));
  const result = await salesModel.findById(new ObjectId(id));
  const emptyValue = 0;
  if (result.length === emptyValue) throw new Error(JSON.stringify(saleNotFoundError));
  return result;
};

const insertNewSale = async (sales) => {
  const verifyMap = sales.map(({productId, quantity}) => {
    return verifySale(productId, quantity);
  });
  await Promise.all(verifyMap);
  return salesModel.insertNewSale(sales);
};

const findAll = async () => {
  const result = await salesModel.findAll();
  return result;
};

const findById = async (id) => {
  const result = verifyId(id);
  return result;
};

module.exports = {
  insertNewSale,
  findAll,
  findById
};