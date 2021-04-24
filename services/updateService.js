const { productsModel } = require('../models/productsModel');
const {StatusCodes} = require('http-status-codes');
const { CustomError } = require('../middlewares');


async function updateSales(saleList, operation) {
  console.log(productsModel.getById);
  const ProductPromises = saleList.map((sale) => productsModel.getById(sale.productId));
  const ProductList = await Promise.all(ProductPromises);

  await Promise.all(
    ProductList.map((product, index) => {
      const { _id, name, quantity } = product;
      let quantityProduct = quantity;
      let quantitySale = saleList[index].quantity;

      let newQuantity = operation === 'subtract'
        ? quantityProduct - quantitySale
        : quantityProduct + quantitySale;

      if (newQuantity < ZERO_QTD)
        throw new CustomError(
          StatusCodes.NOT_FOUND,
          'stock_problem',
          'Such amount is not permitted to sell'
        );

      return productsModel.update(_id, name, newQuantity);
    }),
  );
};

module.exports = {updateSales};
