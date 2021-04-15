const {
  addNewSale,
  getAll,
  getById,
  updateById,
} = require('../models/salesModel');
const { ObjectId } = require('mongodb');

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

const isValidId = (id) => {
  if (!ObjectId.isValid(id)) {
    return {
      err: {
        code: 'not_found',
        message: 'Sale not found',
      },
    };
  }
  return false;
};

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

const getAllSales = async () => {
  const allSales = await getAll();
  const result = { http: 200, message: { sales: allSales } };
  return result;
};

const handleGetById = async (id) => {
  const validId = isValidId(id);
  if (validId) return { http: 404, message: validId };
  const sale = await getById(id);
  if (!sale) return { http: 404, message: validId };
  return { http: 200, message: sale };
};

const handleUpdateById = async (id, salesArray) => {
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

  // const existThisSale = await getById(id);
  // if (!existThisSale)

  await updateById(id, salesArray);
  const saleResult = await getById(id);
  return { http: 200, message: saleResult };
};

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
  getAllSales,
  handleGetById,
  handleUpdateById,
};
