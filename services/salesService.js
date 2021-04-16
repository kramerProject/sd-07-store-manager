const productsModel = require('../models/productsModel');
const salesModel = require('../models/salesModel');

const EMPTY = 0;

const updateStock = (sale) => {
  console.log('entrada', sale);
  sale.forEach(async (product) => {
    const { productId, quantity } = product;
    const saleProduct = await productsModel.findProductById(productId);
    console.log('saida', saleProduct.quantity);
    const newQuantity = saleProduct.quantity - quantity;
    console.log('subtract', newQuantity);
    if (newQuantity >= EMPTY) {
      await productsModel.updateProduct(productId, saleProduct.name, newQuantity);
    }
  });
};

const restoreStock = async (id) => {
  const sale = await salesModel.findSaleById(id);

  sale.forEach(async (product) => {
    const { productId, quantity } = product;
    const saleProduct = await productsModel.findProductById(productId);
    console.log('saida', saleProduct.quantity);
    const newQuantity = saleProduct.quantity + quantity;
    console.log('subtract', newQuantity);
    if (newQuantity >= EMPTY) {
      await productsModel.updateProduct(productId, saleProduct.name, newQuantity);
    }
  });
};

module.exports = {
  updateStock,
  restoreStock,
};
