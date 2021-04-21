const salesModel = require('../models/salesModel');
const status = require('../config/status');
const productsModel = require('../models/productsModel');

const ZERO = 0;
const ONE = 1;
const validateProductSales = async (productId, quantity) => {
  const resultProductId = await productsModel.findByIdProductsModel(productId);
  if (!resultProductId || typeof quantity !== 'number' || quantity <= ZERO) {
    return false;
  }
  return true;
};

const addSalesService = async (products) => {
  const productsEvery = products.map(async (product) => {
    const validate = await validateProductSales(product.productId, product.quantity);
    // console.log('validadte', validate);
    return validate;
  });
  // console.log('productsEvery', productsEvery);
  if (!productsEvery) {
    return {
      err: {
        code: 'invalid_data',
        status: status.UNPROCESSABLE_ENTITY,
        message: 'Wrong product ID or invalid quantity',
      },
    };
  }
  const salesProducts = await salesModel.addSalesModel(products);
  return salesProducts;
};

const getAllSalesService = async () => {
  const getAllSales = await salesModel.findAllSalesModel();
  return {
    sales: getAllSales,
  };
};

const getByIdSalesService = async (id) => {
  const getByIdSale = await salesModel.findByIdSalesModel(id);
  if (!getByIdSale) {
    return {
      code: 'not_found',
      status: status.NOT_FOUND,
      message: 'Sale not found',
    };
  }
  return getByIdSale;
};

const putByIdSalesService = async (id, data) => {
  const filteredQuantitys =
    data.filter((e) => e.quantity < ONE).length < ONE &&
    data.filter((e) => typeof e.quantity === 'string').length < ONE;
 
  if (!filteredQuantitys) return {
    code: 'invalid_data',
    status: status.UNPROCESSABLE_ENTITY,
    message: 'Wrong product ID or invalid quantity',
  };

  const dataCollection = await productsModel.findAllProductsModel();
  let productsMatch = ZERO;
  data.map((productInList) => {
    dataCollection.map((product) => {
      if (productInList.productId.toString() === product._id.toString())
        productsMatch += ONE;
    });
  });

  if (productsMatch !== data.length) return {
    code: 'invalid_data',
    status: status.UNPROCESSABLE_ENTITY,
    message: 'Wrong product ID or invalid quantity',
  };

  const newData = await salesModel.putByIdSalesModel(id, data);
  return newData;
};
// Ensinado pelo Emerson

const deleteSalesService = async (id) => {
  // const dataSale = await salesModel.findByIdSalesModel(id);
  // console.log('dataSale',dataSale)
  const deleteSale = await salesModel.deleteSalesModel(id);
  // if (!deleteSale) {
  //   return {
  //     err: {
  //       code: 'invalid_data',
  //       status: status.UNPROCESSABLE_ENTITY,
  //       message: 'Wrong sale ID format'
  //     },
  //   };
  // }
  return deleteSale;
};

module.exports = {
  addSalesService,
  getAllSalesService,
  getByIdSalesService,
  putByIdSalesService,
  deleteSalesService,
};
