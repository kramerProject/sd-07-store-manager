const { connection } = require('../../configs');

const creatSale = (name, quantity) => {

};

const updateSale = (name, quantity) => {

};

const deleteSale = (id) => {

};

const getAllSales = () => {
  connection().then(db => db.collection('sales').find().toArray());
};

const getSaleById = (id) => {

};

module.exports = {
  getAllSales,
};
