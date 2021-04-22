const {
  addProduct,
  findNameProduct,
  findAllProduct,
  findIdProduct,
  editProduct,
  deleteProduct,
} = require('./modelProduct');

const {
  addSales,
  findNameSales,
  findAllSales,
  findIdSales,
  findIdDeleteSales,
  editSales,
  deleteSales,
} = require('./modelSales');

module.exports = {
  addProduct,
  findNameProduct,
  findAllProduct,
  findIdProduct,
  findIdDeleteSales,
  editProduct,
  deleteProduct,
  addSales,
  findNameSales,
  findAllSales,
  findIdSales,
  editSales,
  deleteSales,
};
