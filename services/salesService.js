const productsModel = require('../models/productsModel');
const salesModel = require('../models/salesModel');

const EMPTY = 0;

const updateStock = async (sale) => {
  console.log('entrada', sale);
  for (const product of sale) {
    const { productId, quantity } = product;
    const saleProduct = await productsModel.findProductById(productId);
    console.log('saida', saleProduct.quantity);
    const newQuantity = saleProduct.quantity - quantity;
    console.log('subtract', newQuantity);
    if (newQuantity >= EMPTY) {
      const x = await productsModel
        .updateProduct(productId, saleProduct.name, newQuantity);
      const y =  await productsModel
        .findProductById(productId);
      console.log('eu sou diferente', y);
    }

  }
};

const restoreStock = async (id) => {
  const sale = await salesModel.findSaleById(id);
  if (sale) {
    for (const product of sale.itensSold) {
      const { productId, quantity } = product;
      const saleProduct = await productsModel.findProductById(productId);
      console.log('saida', saleProduct.quantity);
      const newQuantity = saleProduct.quantity + quantity;
      console.log('subtract', newQuantity);
      if (newQuantity >= EMPTY) {
        await productsModel.updateProduct(productId, saleProduct.name, newQuantity);
      }
    }
  }
};

module.exports = {
  updateStock,
  restoreStock,
};
