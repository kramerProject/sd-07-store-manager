const { ObjectId } = require('mongodb');
const salesModel = require('../model/salesModel.js');
const { wrongIdOrQuantityError } = require('../errors/errors.js');
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

const insertNewSale = async (sales) => {
  const verifyMap = sales.map(({productId, quantity}) => {
    return verifySale(productId, quantity);
  });
  await Promise.all(verifyMap);
  return salesModel.insertNewSale(sales);
};

module.exports = {
  insertNewSale,
};