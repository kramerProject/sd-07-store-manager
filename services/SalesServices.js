const salesModels = require('../models/SalesModels');
const productsModels = require('../models/ProductsModels');
const validated = require('./ValidatedSales');
const ObjectId = require('mongodb').ObjectId;

const convertId = (id) => {
  try{
    return ObjectId(id);
  } catch {
    return null;
  }
};

const createSale = async (product) => {
  switch(true) {
  case await validated.productNotExist(product): 
    console.log('xblau!!');
    throw { message: validated.message.invalidIdQtd };
  case validated.invalidQuantity(product):
    throw { message: validated.message.invalidIdQtd };
  case validated.quantityNotNumber(product):
    throw { message: validated.message.invalidIdQtd};
  default:
    const result = await salesModels.createSale(product);
    // result.itensSold.forEach(async item => {
    //   const product = await productsModels.getProductById(convertId(item.productId));
    //   await productsModels.updateProductsById(convertId(item.productId), {
    //     quantity: product.quantity - item.quantity 
    //   });
    // });
    
    return { message: result.ops[0] };
  }
};

const getSale = async () => {
  const salesList = await salesModels.getSale();
  return { message: { sales: salesList } };
};

const getSaleById = async (id) => {
  const objectId = convertId(id);
  if(!objectId) throw { message: validated.message.saleNotFound };
  const sale = await salesModels.getSaleById(objectId);
  if(!sale) throw { message: validated.message.saleNotFound };
  return { message: sale };
};

const updateSalesById = async (id, sale) => {
  switch(true) {
  case await validated.productNotExist(sale):
    throw { message: validated.message.invalidIdQtd };
  case validated.invalidQuantity(sale):
    throw { message: validated.message.invalidIdQtd };
  case validated.quantityNotNumber(sale):
    throw { message: validated.message.invalidIdQtd };
  default:
    const objectId = convertId(id);
    if(!objectId) throw { message: validated.message.saleNotFound };
    const updateSale = await salesModels.updateSalesById(objectId, sale);
    return { message: updateSale.value };
  }
};

const deleteSalesById = async (id) => {
  const objectId = convertId(id);
  if(!objectId) throw { message: validated.message.invalidFormatId };
  const deleteSale = await salesModels.deleteSalesById(objectId);
  if(!deleteSale) throw { message: validated.message.invalidFormatId };
  return { message: deleteSale };
};

module.exports = {
  createSale,
  getSale,
  getSaleById,
  updateSalesById,
  deleteSalesById
};