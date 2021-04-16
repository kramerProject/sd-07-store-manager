const { ObjectID } = require('mongodb');
const { salesModel, productsModel } = require('../models');
const { create, read, readById, update, exclude } = salesModel;

const NOT_FOUND = 404;
const CODE_NOT_FOUND = 'stock_problem';

const updateQuantity = async (saleList, operation) => {
  const ProductPromises = saleList.map((sale) => productsModel.readById(sale.productId));
  const ProductList = await Promise.all(ProductPromises);

  await Promise.all(
    ProductList.map((product, index) => {
      const { _id, name, quantity } = product;
      let quantityProduct = quantity;
      let quantitySale = saleList[index].quantity;
      let newQuantity =
        operation === 'subtract' ? quantityProduct - quantitySale : quantityProduct + quantitySale;
      if (newQuantity < 0)
        throw new Error(JSON.stringify({
          ok: 1,
          message: 'Such amount is not permitted to sell',
          status: NOT_FOUND,
          code: CODE_NOT_FOUND,
        }));
      return productsModel.update(_id, name, newQuantity);
    }),
  );
};

const createSale = async (productList) => {
  productList.forEach((product) => {
    if (!ObjectID.isValid(product.productId))
      throw new Error('Wrong product ID or invalid quantity');
    if (product.quantity <= 0 || typeof product.quantity !== 'number')
      throw new Error('Wrong product ID or invalid quantity');
  });

  await updateQuantity(productList, 'subtract');
  const newSale = await create(productList);
  if (!newSale.result.ok) throw new Error('Error from model - create');
  return { _id: newSale.insertedId, itensSold: productList };
};

const readSales = async () => {
  const data = await read();
  if (!data) throw new Error('Error from model - readSales');
  return data;
};

const readSalesById = async (id) => {
  if (!ObjectID.isValid(id)) throw new Error('Sale not found');
  const Sale = await readById(id);
  if (!Sale) throw new Error('Sale not found');
  return Sale;
};

const updateSaleById = async (id, body) => {
  const { productId, quantity } = body[0];
  if (!ObjectID.isValid(id)) throw new Error('Wrong product ID or invalid quantity');

  if (quantity <= 0 || typeof quantity !== 'number')
    throw new Error('Wrong product ID or invalid quantity');

  const newSale = await update(id, productId, quantity);
  if (!newSale.result.ok) throw new Error('Error from model - updateSaleById');
  return { _id: id, itensSold: body };
};

const deleteSaleById = async (id) => {
  if (!ObjectID.isValid(id)) throw new Error('Wrong sale ID format');
  const readSale = await readSalesById(id);
  const SaleDeleted = await exclude(id);
  if (!SaleDeleted.result.ok) throw new Error('Error from model - deleteSaleById');
  await updateQuantity(readSale.itensSold, 'add');
  return readSale;
};

module.exports = {
  createSale,
  readSales,
  readSalesById,
  updateSaleById,
  deleteSaleById,
};
