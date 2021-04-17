const { ObjectId } = require('mongodb');
/* const modelsProducts = require('../models/modelsProducts'); */
const modelsSales = require('../models/modelsSales');

// rules for insert sales
const rulesInsSale = async (sale) => {
  const oneN = 1;
  if (sale.quantity < oneN) {
    throw {
      code: 'invalid_data',
      message: 'Wrong product ID or invalid quantity',
    };
  }
  if (typeof sale.quantity !== 'number') {
    throw {
      code: 'invalid_data',
      message: '"quantity" must be a number',
    };
  }
  // productId === db.productId
  // newSale === newId
  return true
};


const create = async (sale) => {
  // const rules = await rulesInsSale(sale);
  // if (!rules) {
  //   return false;
  // };
  const saleInserted = await modelsSales.create(sale);
  return saleInserted;
};

const getAll = async () => {
  const sales = await modelsSales.getAll();
  const salesList = {
    sales,
  };
  return salesList;
};

const getById = async (id) => {

  const salesById = await salesModel.getById(id);
  if (!salesById) {
    throw {
      code: 'not_found',
      message: 'Sale not found',
    };
  }
  return salesById;
};

const updateById = async (id, sale) => {
  const updatedSale = await modelsSales.updateById(id, sale);

  if (updatedSale === 1) {
    const updateSales = {
      _id: id,
      itensSold: sale,
    };

    return updateSales;
  }
};

const excludeById = async (id) => {
  if (!ObjectId(id)) {
    throw {
      code: 'invalid_data',
      message: 'Wrong sale ID format',
    };
  }
  const excludedSale = await modelsSales.excludeById(id);
  if (!excludedSale) {
    throw {
      code: 'invalid_data',
      message: 'Wrong sale ID format',
    };
  }
  return excludedSale;
};

module.exports = {
  create,
  getAll,
  getById,
  updateById,
  excludeById
};
