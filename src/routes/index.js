const { creatProduct, getAllProducts, deletProduct } = require('./products');
const { getAllSales, creatSale, updateSale, deletSale  } = require('./sales');

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
    deletSale,
  },
};
