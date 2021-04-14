const {
  modelAddToSales,
  modelGetAllSales,
  modelGetSalesById
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
// async function checkIds(salesList) {
//     salesList.forEach(async sale => {
//         const check = await modelCheckId(sale.productId); //ainda não criei a função no model
//         if (!check) {
//             throw new Error("Wrong product ID or invalid quantity")
//         }
//     })
// }
async function addToSales(salesList) {
  return result = await modelAddToSales(salesList);
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

module.exports = {
  checkQuantities,
  // checkIds,
  addToSales,
  serviceGetAllSales,
  serviceGetSalesById
};