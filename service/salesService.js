const {
  modelAddToSales
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

module.exports = {
  checkQuantities,
  // checkIds,
  addToSales
};