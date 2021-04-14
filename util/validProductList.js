const ProductService = require('../services/ProductService');
const quantityIsNumber = require('./quantityIsNumber');
const validInsertQuantity = require('./validInsertQuantity');
const { ObjectId } = require('mongodb');

const validProductList = async (productsList) => {
  const productIds = productsList.map((e) => e.productId);
  const productQuantitys = productsList.map((e) => e.quantity);
  console.log(productIds);
  const result = await validIsList(productIds);
  console.log('result 1 ' + result);

  return result;

};

const validIsList = async (productId) => {
  const validateIds = await Promise.all(productId.map( async (e) => {

    const result = await ProductService.findById(e.productId);
    return result;
  }));
  console.log(validateIds);
};



/* const validProductList = async (productsList) => {
  const result = await Promise.all(productsList.map(async (product) => {

    const isNumber = quantityIsNumber(product.quantity);

    const isValidQuantity = validInsertQuantity(product.quantity);

    const isValidProductsId = await ProductModel.findById(product.productId);

    if (!isNumber || !isValidQuantity || !isValidProductsId) return false;

  })
  );
  return result;
}; */

module.exports = validProductList;
