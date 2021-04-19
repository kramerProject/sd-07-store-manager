const salesModel = require('../models/salesModel');
const productsModel = require('../models/productsModel');
const { ZERO, CODE_ERROR } = require('../valuesGlobal');

const checkedProducts = async (itensSold) => {
  console.log('checkedProducts', itensSold);
  const productSolds = await Promise.all(
    itensSold.map( async ({ productId, quantity }) => {
      let newQuantity = quantity;
      const product = await productsModel.getById(productId);
      console.log('newQuantity > product.quantity: ', newQuantity > product.quantity);
      console.log('newQuantity > product.quantity: ', newQuantity, product.quantity);
      if (newQuantity > product.quantity) newQuantity = product.quantity;

      if (product === null || (product.quantity - newQuantity < ZERO)) return null;

      return { productId, quantity: newQuantity};
    }));

  const isValid = productSolds
    .every((item) => {
      return item !== null && (item.quantity > ZERO && typeof item.quantity !== 'string');
    });

  return { isValid, itensSold: productSolds };
};

const addSale = async (itensSold) => {
  const checked = await checkedProducts(itensSold);

  if (!checked.isValid) return {
    message: 'Wrong product ID or invalid quantity',
    cod_err: true };

  return await salesModel.add(checked.itensSold);
};

const normalize = async () => {
  const sales = await salesModel.getAll();

  sales.forEach(({ itensSold }) => {
    itensSold.forEach(async ({ productId, quantity }) => {
      const oldProduct = await productsModel.getById(productId);
      const newQuantity = oldProduct.quantity - quantity;
      console.log(newQuantity, ' = ', oldProduct.quantity, ' - ', quantity);

      const product = await productsModel.updateQuantity(productId, newQuantity);
      console.log(product);
    });
  });
  return 'OK!';
};

const normalizeDelete = async () => {
  const sales = await salesModel.getAll();

  sales.forEach(({ itensSold }) => {
    itensSold.forEach(async ({ productId, quantity }) => {
      const oldProduct = await productsModel.getById(productId);
      const newQuantity = oldProduct.quantity + quantity;
      console.log(newQuantity, ' = ', oldProduct.quantity, ' + ', quantity);

      const product = await productsModel.updateQuantity(productId, newQuantity);
      console.log(product);
    });
  });
  return 'OK!';
};

const updateSale = async (id, itensSold) => {
  const checked = await checkedProducts(itensSold);

  if (!checked.isValid) return {
    message: 'Wrong product ID or invalid quantity',
    cod_err: true };

  return await salesModel.update(id, checked.itensSold);
};


module.exports = {
  addSale,
  updateSale,
  normalize,
  normalizeDelete,
};
