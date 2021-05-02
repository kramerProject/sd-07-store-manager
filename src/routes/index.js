const { creatProduct, getAllProducts, deletProduct } = require('./products');
const { getAllSales, creatSale, updateSale  } = require('./sales');

module.exports = {
  products: {
    creatProduct,
    getAllProducts,
    deletProduct,
  },
  sales: {
    getAllSales,
    creatSale,
    updateSale,
  },
};
