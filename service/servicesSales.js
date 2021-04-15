const SalesModel = require('../models/salesModel');
const ProductsModel = require('../models/productsModel');

async function serviceAddSales(itensSold) {
  const allProducts = await ProductsModel.getAllProducts();
  const MIN_QUANTITY = 0;
  itensSold.forEach(item => {
    const product = allProducts.find((products) => {
      return String(products._id) === item.productId;
    });
    if (!product)
      throw { code: 'invalid_data', message: 'Wrong product ID or invalid quantity' };
    const quantity = product.quantity - item.quantity;
    if(quantity < MIN_QUANTITY )
      throw { code: 'invalid_data', message: 'Wrong product ID or invalid quantity' };
  });

  const sale = await SalesModel.add(itensSold);
  return sale;
}

async function serviceGetAllSales() {
  return await SalesModel.getAllSales();
}

async function serviceGetSalesById(id) {
  const productID = await SalesModel.getSalesById(id);
  if (!productID)
    throw { code: 'not_found', message: 'Sale not found' };
  return productID;
}


module.exports = {
  serviceAddSales,
  serviceGetAllSales,
  serviceGetSalesById
};