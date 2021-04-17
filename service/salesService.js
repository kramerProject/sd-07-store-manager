const salesModel = require('../models/salesModel');
const status = require('../config/status');
const productsModel = require('../models/productsModel');

const getByIdSales = (id) => {
  const { id } = req.params;
  const productId = productsModel.findByIdProductsModel(id);
  if(!productId) {
    err: {
      code: "invalid_data",
      status: status.UNPROCESSABLE_ENTITY,
      message: 'Wrong product ID or invalid quantity',
    }
  }
};

