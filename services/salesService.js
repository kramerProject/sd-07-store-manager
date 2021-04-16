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

const updateSale = async (itensSold, id) => {
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
      const sale = await update(itensSold, id);
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
      'code': 'not_found',
      'message': 'Sale not found'
    }
  };
  const codeErr = 404;
  const codeSuccess = 200;
  try {
    const sale = await getById(id);
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

const deleteSale = async (id) => {
  const dataErr = {
    'err': {
      'code': 'invalid_data',
      'message': 'Wrong sale ID format'
    }
  };
  const codeErr = 422;
  const codeSuccess = 200;
  try {
    const sale = await exclude(id);
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
  deleteSale,
  updateSale
};