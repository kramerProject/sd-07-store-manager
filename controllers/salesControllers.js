const {
  createSalesService,
  getllService,
} = require('../services/saleServices');

const httpStatus = {
  SUCCESS: 200,
  UNPROCESSABLE_ENTITY: 422,
  CREATED: 201,
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

// const getAllController = async (req, res) => {
//   try {

//   } catch (error) {

//   }
// };

module.exports = {
  createSalesController,
};