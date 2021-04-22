const salesModel = require('../model/salesModel');
const productsModel = require('../model/productsModel');
const { ObjectId } = require('mongodb');

const defaultErr = {
  err: {
    code: 'invalid_data',
    message: 'Wrong product ID or invalid quantity',
  },
};

const checkId = (id, err) => {
  if(!ObjectId.isValid(id)) throw new Error(JSON.stringify(err));
};

const averageValidation = async (order) => {
  const { productId, quantity } = order;
  const saleParam = 0;
  
  checkId(productId, defaultErr);
  
  const product = await productsModel.getById(productId);
  console.log('chegou aqui');
  
  // quantity deve ser um número inteiro maior que 0;
  if (quantity <= saleParam) throw new Error(JSON.stringify(defaultErr));

  if (typeof quantity !== 'number') throw new Error(JSON.stringify(defaultErr));
  
  //   O productId devem ser igual ao id de um produto anteriormente cadastrado;
  if (!product) throw new Error(JSON.stringify(defaultErr));
};


const postNewSale = async (order) => {
  const validation = order.map((order) => averageValidation(order));
  await Promise.all(validation);
  return salesModel.postNewSale(order);
};

const getAll = async () => {
  const search = await salesModel.getAll();
  return search;
};

const getById = async (id) => {
  checkId(id, {
    err: {
      code: 'not_found',
      message: 'Sale not found',
    },
  });

  const search = await salesModel.getById(id);
  if(!search) throw new Error(JSON.stringify({
    err: {
      code: 'not_found',
      message: 'Sale not found',
    },
  }));

  return search;
};

const putSale = async (id, newSale) => {
  checkId(id, defaultErr);
  const validation = newSale.map((order) => averageValidation(order));
  await Promise.all(validation);
  return salesModel.putSale(id, newSale);
};

const deleteSale = async (id) => {
  checkId(id,{
    err: {
      code: 'invalid_data',
      message: 'Wrong sale ID format',
    },
  });
  const sale = salesModel.getById(id);
  if(!sale) throw new Error({
    err: {
      code: 'invalid_data',
      message: 'Wrong sale ID format',
    },
  });
  return salesModel.deleteSale(id);
};

module.exports = {
  postNewSale,
  getAll,
  getById,
  putSale,
  deleteSale
};
