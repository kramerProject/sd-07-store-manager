const { ObjectId } = require('mongodb');
const modelsProducts = require('../models/modelsProducts');
const modelsSales = require('../models/modelsSales');

// rules for insert sales
// const rulesInsSale = async ()
// productId === db.productId
// quantity > 0 && Number
// newSale === newId


const create = async (sale) => {
  // const rules = rules.productModels.getByid(sale[0].id)

  console.log('sales');
  const saleInserted = await modelsSales.create(sale);
  return saleInserted;
};

module.exports = {
  create
};
