const {
  modelAddToSales,
  modelGetAllSales,
  modelGetSalesById,
  modelUpdateSalesById,
  modelDeleteSalesById,
  modelUpdateProductQuantity,
  modelFindListById
} = require('../model/salesModel');
const ObjectId = require('mongodb').ObjectId;
const five = 5;
function checkQuantities(salesList) {
  salesList.forEach(sale => {
    if (sale.quantity < 1 || typeof sale.quantity !== 'number') {
      throw new Error('Wrong product ID or invalid quantity');
    }
  });
}

async function addToSales(salesList) {
  return await modelAddToSales(salesList);
}

async function serviceGetAllSales() {
  return await modelGetAllSales();
}


async function serviceGetSalesById(id) {
  const result = await modelGetSalesById(id);
  if (!result) {
    throw new Error('Sale not found');
  }
  return result;
}

async function serviceUpdateSalesById(salesId, productList) {
  let result = true;
  productList.forEach(async sale => {
    result = await modelUpdateSalesById(salesId, sale);
    if (!result) {
      throw new Error('Wrong id format');
    }
  });

  return result;
}


async function serviceDeleteSalesById(id) {
  const result = await modelDeleteSalesById(id);
  if (!result) {
    throw new Error('Wrong sale ID format');
  }
  return result;
}

async function updateProductAfterSale(salesList, addOrDelete) {
  for (const sale of salesList) {
    const result = await modelUpdateProductQuantity(sale, addOrDelete);
    // if (result === false) {
    //     throw new Error('Such amount is not permitted to sell')
    // } ISSO TÁ ATIVANDO TODA HORA! POR QUE?
  }
}

async function serviceFindListById(id) {
  return modelFindListById(id);
}
module.exports = {
  checkQuantities,
  addToSales,
  serviceGetAllSales,
  serviceGetSalesById,
  serviceUpdateSalesById,
  serviceDeleteSalesById,
  updateProductAfterSale,
  serviceFindListById
};