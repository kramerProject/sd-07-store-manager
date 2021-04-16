const {addSale} = require('../Models/sales/addSale');

const serviceAddSale = (arrayProduct) => {
  return  addSale(arrayProduct);
};

module.exports = {
  serviceAddSale,
};