const {
  addNewSale,
  getProductById,
} = require('../models/salesModel');
// const { ObjectId } = require('mongodb');

const errorMessage = {
  err: {
    code: 'invalid_data',
    message: 'Wrong product ID or invalid quantity',
  },
};

const greaterThanZero = (quantity) => {
  if (quantity < 1) return errorMessage;
  return false;
};

const checkTypeEqualNumber = (quantity) => {
  if (typeof quantity !== 'number') return errorMessage;
  return false;
};

// const isValidId = (id) => {
//   if (!ObjectId.isValid(id)) errorMessage;
//   return false;
// };

const newSaleIsValid = async (salesArray) => {
  const isGreaterThanZero = salesArray.map(({ quantity }) => greaterThanZero(quantity));
  const lessOrEqualZero = isGreaterThanZero.find((currentValue) => currentValue);
  if (lessOrEqualZero) {
    return { http: 422, message: lessOrEqualZero };
  }

  const isNumber = salesArray.map(({ quantity }) => checkTypeEqualNumber(quantity));
  const isNotANumber = isNumber.find((currentValue) => currentValue);
  if (isNotANumber) {
    return { http: 422, message: isNotANumber };
  }

  const saleCreated = await addNewSale(salesArray);
  const saleResult = saleCreated.ops[0];
  return { http: 200, message: saleResult };
};

// const getAllProducts = async () => {
//   const allProducts = await getAll();
//   const result = { http: 200, message: { products: allProducts } };
//   return result;
// };

// const handleGetById = async (id) => {
//   const validId = isValidId(id);
//   if (validId) return { http: 422, message: validId };
  
//   const product = await getById(id);
//   return { http: 200, message: product };
// };

// const handleUpdateById = async (id, name, quantity) => {
//   const validId = isValidId(id);
//   if (validId) return { http: 422, message: validId };

//   const isGreaterThanFive = greaterThanFive(name);
//   if (isGreaterThanFive) return { http: 422, message: isGreaterThanFive };

//   const isGreaterThanZero = greaterThanZero(quantity);
//   if (isGreaterThanZero) return { http: 422, message: isGreaterThanZero };

//   const isNumber = checkTypeEqualNumber(quantity);
//   if (isNumber) return { http: 422, message: isNumber };

//   await updateById(id, name, quantity);
//   const updatedProduct = await getById(id);
//   return { http: 200, message: updatedProduct };
// };

// const handleDeleteById = async (id) => {
//   const validId = isValidId(id);
//   if (validId) return { http: 422, message: validId };
//   const deletedProduct = await getById(id);
//   if (deletedProduct === null) return { http: 422, message: validId };
//   await deleteById(id);
//   return { http: 200, message: deletedProduct };
// };

module.exports = {
  newSaleIsValid,
};
