const productsModel = require('../model/productsModel');

const errEx = {
  err: {
    code: 'invalid_data',
    message: '',
  },
};

const averageValidation = (name, quantity) => {
  // name deve ser uma string com mais de 5 caracteres;
  const minNameLength = 5;
  if(name.length < minNameLength) throw new Error(JSON.stringify({
    err: { 
      code: 'invalid_data',
      message: '"name" length must be at least 5 characters long',
    },
  }));

  // quantity deve ser um número inteiro maior que 0;
  const stockParam = 0;
  if(quantity <= stockParam) throw new Error(JSON.stringify({
    err: { 
      code: 'invalid_data',
      message: '"quantity" must be larger than or equal to 1',
    },
  }));
  
  if(typeof quantity !== 'number') throw new Error(JSON.stringify({
    err: { 
      code: 'invalid_data',
      message: '"quantity" must be a number',
    },
  }));
};

const postNewProduct = async (name, quantity) => {
  const isUnique = await productsModel.nameIsUnique(name);
  if(!isUnique) throw new Error(JSON.stringify({
    err: { 
      code: 'invalid_data',
      message: 'Product already exists',
    },
  }));
  averageValidation(name, quantity);
  return productsModel.postNewProduct(name, quantity);
};

const getAll = async () => {
  const search = await productsModel.getAll();
  return search;
};

const getById = async (id) => {
  const search = await productsModel.getById(id);
  if (!search) throw new Error(JSON.stringify({
    err: { 
      code: 'invalid_data',
      message: 'Wrong id format',
    },
  }));
  return search;
};

module.exports = {
  averageValidation,
  postNewProduct,
  getAll,
  getById
};
