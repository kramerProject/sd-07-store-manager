const { creatProduct, getAllProducts, deletProduct } = require('./products');
const { getAllSales, creatSale } = require('./sales');

module.exports = {
  products: {
    creatProduct,
    getAllProducts,
    deletProduct,
  },
  sales: {
    getAllSales,
    creatSale,
  },
};
