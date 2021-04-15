const verifyQuantity = require('./verifyQuantity');
const { add, update, exclude, getById, getAll } = require('../models/Sales');

const createSale = async (itensSold) => {

  if(itensSold
    .some(item => !verifyQuantity.length(item.quantity)) || 
    itensSold.some(item => !verifyQuantity.type(item.quantity))) {
    return {
      data: {
        'err': {
          'code': 'invalid_data',
          'message': 'Wrong product ID or invalid quantity'
        },
      },
      code: 422,
    };
  } else {
    const dataErr = {
      'err': {
        'code': 'invalid_data',
        'message': 'Wrong id format'
      }
    };
    const codeErr = 422;
    const codeSuccess = 200;
    try {
      const sale = await add(itensSold);
      console.log(sale);
      if (!sale) return {
        data: dataErr,
        code: codeErr
      };
  
      return {
        data: sale,
        code: codeSuccess,
      };
    } catch (error) {
      return {
        data: dataErr,
        code: codeErr
      };
    }
  };
  
};

const listSales = async () => {
  const products = await getAll();
  return products;
};

const getSale = async (id) => {
  const dataErr = {
    'err': {
      'code': 'invalid_data',
      'message': 'Wrong id format'
    }
  };
  const codeErr = 422;
  const codeSuccess = 200;
  try {
    const sale = await getById(id);
    console.log(sale);
    if (!sale) return {
      data: dataErr,
      code: codeErr
    };
      
    return {
      data: sale,
      code: codeSuccess,
    };
  } catch (error) {
    return {
      data: dataErr,
      code: codeErr
    };
  }
};

module.exports = {
  createSale,
  listSales,
  getSale,
};