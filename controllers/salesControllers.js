const {
  createSalesService,
  getAllService,
  getSalesByIdService,
  updateSalesService,
} = require('../services/saleServices');

const httpStatus = {
  SUCCESS: 200,
  UNPROCESSABLE_ENTITY: 422,
  CREATED: 201,
  NOT_FOUND: 404,
};

const createSalesController = async (req, res) => {
  try {
    const sales = req.body;
    const addSales = await createSalesService(sales);
    res.status(httpStatus.SUCCESS).json(addSales);
  } catch (error) {
    res.status(httpStatus.UNPROCESSABLE_ENTITY).json({
      'err': {
        'code': 'invalid_data',
        'message': error.message
      }
    });
  }
};

const getAllController = async (req, res) => {
  try {
    const salesList = await getAllService();
    res.status(httpStatus.SUCCESS).json(salesList);
  } catch (error) {
    res.status(httpStatus.UNPROCESSABLE_ENTITY).json({
      'err': {
        'code': 'not_found',
        'message': error.message
      }
    });
  }
};

const getByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const foundSales = await getSalesByIdService(id);
    res.status(httpStatus.SUCCESS).json({ 'sales': foundSales });
  } catch (error) {
    res.status(httpStatus.NOT_FOUND).json({
      'err': {
        'code': 'not_found',
        'message': error.message,
      }
    });
  }
};

const updateSalesController = async (req, res) => {
  try {
    const { id } = req.params;
    const sales = req.body;
    const updateSales = await updateSalesService(id, sales);
    res.status(httpStatus.SUCCESS).json({
      '_id': id,
      'itensSold': sales,
    });
  } catch (error) {
    res.status(httpStatus.UNPROCESSABLE_ENTITY).json({
      'err': {
        'code': 'invalid_data',
        'message': error.message,
      }
    });
  }
};

module.exports = {
  createSalesController,
  getAllController,
  getByIdController,
  updateSalesController,
};