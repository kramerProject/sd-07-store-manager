
const salesModel = require('../models/salesModel');
const func = require('../util');
// const validName = require('../middlewares/validName');
const status = require('./status');

const ONE = 1;
const ZERO = 0;

const getAll = async () => {
  const result = await salesModel.getAllSales();
  const formatedResult = { sales: result };
  // console.log(formatedResult);
  return formatedResult;
};

const findById = async (id) => {
  const result = await salesModel.findById(id);
  return result;
};


const create = async (products) => {
  // const productsList = [ ...products];
  //console.log(productsList);
  const filteredQuantitys =
    products.filter((e) => e.quantity < ONE).length < ONE &&
    products.filter((e) => typeof e.quantity === 'string').length < ONE;

  if (!filteredQuantitys) return {
    isError: true,
    code: 'invalid_data',
    status: status.UNPROCESSABLE_ENTITY,
    message: 'Wrong product ID or invalid quantity',
  };

  const productsCollection = await salesModel.getAllProducts();
  let xablau = ZERO;
  products.map((productInList) => {
    productsCollection.map((product) => {
      if (productInList.productId.toString() === product._id.toString())
        xablau += ONE;
    });
  });

  if (xablau !== products.length) return {
    isError: true,
    code: 'invalid_data',
    status: status.UNPROCESSABLE_ENTITY,
    message: 'Wrong product ID or invalid quantity',
  };

  // const isValidProducts = await func.validProductList(productsList);


  // console.log(isValidProducts);
  const result = await salesModel.createSale(products);
  return result;
};



// \/ Req. 7 Crie um endpoint para atualizar uma venda
const editById = async (id, products) => {

  const validIdList = await salesModel.findById(id);
  console.log('ID RETORNADO', validIdList);
  if (!validIdList) return {
    isError: true,
    code: 'invalid_data',
    status: status.UNPROCESSABLE_ENTITY,
    message: 'Wrong product ID or invalid quantity',
  };

  const filteredQuantitys =
    products.filter((e) => e.quantity < ONE).length < ONE &&
    products.filter((e) => typeof e.quantity === 'string').length < ONE;

  if (!filteredQuantitys) return {
    isError: true,
    code: 'invalid_data',
    status: status.UNPROCESSABLE_ENTITY,
    message: 'Wrong product ID or invalid quantity',
  };

  const productsCollection = await salesModel.getAllProducts();
  let xablau2 = ZERO;
  products.map((productInList) => {
    productsCollection.map((product) => {
      if (productInList.productId.toString() === product._id.toString())
        xablau2 += ONE;
    });
  });

  if (xablau2 !== products.length) return {
    isError: true,
    code: 'invalid_data',
    status: status.UNPROCESSABLE_ENTITY,
    message: 'Wrong product ID or invalid quantity',
  };







  const findSale = await salesModel.updateById(id, products);
  console.log('>>>>>>>>>>>>>>>', findSale);
  return findSale;
};

const exluce = async (id) => {
  const result = await salesModel.deleteList(id);
  return result;
};


module.exports = {
  getAll,
  create,
  findById,
  editById,
  exluce,
};
