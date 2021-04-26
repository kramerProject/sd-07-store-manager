const { ObjectID } = require('mongodb');
const { add, exclude, getAll, update, getById } = require('../models/productsModel');
const { CustomError } = require('../middlewares');
const {StatusCodes} = require('http-status-codes');

const code = 'invalid_data';
const ZERO_QTD = 0;

const addProduct = async (name, quantity) => {
  const productsList = await getAllProducts();

  if (!productsList) throw new CustomError(
    StatusCodes.UNPROCESSABLE_ENTITY,
    code,
    'Products undefined'
  );
  const checkNameExists = productsList.some((product) => product.name === name);
  if (checkNameExists) throw new CustomError(
    StatusCodes.UNPROCESSABLE_ENTITY,
    code,
    'Product already exists'
  );

  const newProduct = await add(name, quantity);
  if (!newProduct.result.ok) throw new CustomError(
    StatusCodes.UNPROCESSABLE_ENTITY,
    code,
    'Error from model - add'
  );
  return { _id: newProduct.insertedId, name, quantity };
};

const getAllProducts = async () => {
  const data = await getAll();
  if (!data) throw new CustomError(
    StatusCodes.UNPROCESSABLE_ENTITY,
    code,
    'Error from model - getAll');
  return data;
};

const readProductsById = async (id) => {
  if (!ObjectID.isValid(id)) throw new CustomError(
    StatusCodes.UNPROCESSABLE_ENTITY,
    code,
    'Wrong id format');
  const product = await getById(id);
  if (!product) throw new CustomError(
    StatusCodes.UNPROCESSABLE_ENTITY,
    code,
    'Product not found');
  return product;
};

const updateProductById = async (id, name, quantity) => {
  const newProduct = await update(id, name, quantity);

  return { _id: newProduct.insertedId, name, quantity };
};

const deleteProductById = async (id) => {
  if (!ObjectID.isValid(id)) throw new CustomError(
    StatusCodes.UNPROCESSABLE_ENTITY,
    code,
    'Wrong id format');
  const readProduct = await readProductsById(id);
  const productDeleted = await exclude(id);
  if (!productDeleted.result.ok) throw new CustomError(
    StatusCodes.UNPROCESSABLE_ENTITY,
    code,
    'Error from model - deleteProduct'
  );
  return readProduct;
};

async function updateBySales(saleList, operation) {
  const ProductPromises = saleList.map((sale) => getById(sale.productId));
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

      return update(_id, name, newQuantity);
    }),
  );
};

module.exports = {
  addProduct,
  getAllProducts,
  readProductsById,
  updateProductById,
  deleteProductById,
  updateBySales,
};
