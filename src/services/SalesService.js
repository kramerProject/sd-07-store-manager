const SalesModel = require('../models/SalesModel');
const ProductModel = require('../models/ProductModel');

const createSale = async (sales) => {
  const decrement = -1;
  const salesRes = await SalesModel.createSale(sales);

  const { itensSold } = salesRes;
  await itensSold.forEach(async product => {
    await ProductModel.updateAfterSales(product._id, product.quantity * decrement);
  });

  return salesRes;
};

const getSales = async () => {
  
  const salesRes = await SalesModel.getSales();

  return { sales: salesRes };
};

const getSalesById = async (id) => {
  
  const salesRes = await SalesModel.getSalesById(id);

  return salesRes;
};

const deleteSales = async (id) => {
  const salesRes = await SalesModel.getSalesById(id);
  const delRes = await SalesModel.deleteSales(id, salesRes);
  const { itensSold } = delRes;
  await itensSold.forEach(async product => {
    await ProductModel.updateAfterSales(product._id, product.quantity);
  });
  return delRes;
};


module.exports = {
  createSale,
  getSales,
  getSalesById,
  deleteSales
};