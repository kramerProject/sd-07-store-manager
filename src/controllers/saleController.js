const saleModel = require('../models/saleModel');
const {
  SUCCESS,
  SERVER_ERROR,
  SEMANTIC_ERROR,
  NEW_RESOURCE,
  UNPROCESSABLE_ENTITY,
  ERROR,
} = require('../data/httpStatus');

const quantityMinLength = 0;

const postSales = async (req, res) => {
  try {
    const validatedSales = [];
    const listOfSales = req.body;
    let errorMessage = {
      'err': { 'code': 'invalid_data', 'message': '' }
    };

    listOfSales.forEach(async ({ productId, quantity }) => {
      if (quantity <= quantityMinLength || typeof quantity === 'string') {
        errorMessage.err.message = 'Wrong product ID or invalid quantity';
        res.status(UNPROCESSABLE_ENTITY).json(errorMessage);

      } else {
        validatedSales.push({ productId, quantity });
      }

      const results = await saleModel.postSales(validatedSales);
      res.status(SUCCESS).json(results);
    });


  } catch (error) {
    console.error(error);
    res.status(SERVER_ERROR).json({ message: 'server error' });
  }
};

const getAllSales = async (_req, res) => {
  try {
    const results = { sales: await saleModel.getAllSales() };

    res.status(SUCCESS).json(results);
  } catch (error) {
    console.error(error);
    res.status(SERVER_ERROR).json({ message: 'server error' });
  }
};

const getSaleById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await saleModel.getSaleById(id);

    if (result.sales === null) {
      res.status(ERROR)
        .json({ 'err': { 'code': 'not_found', 'message': 'Sale not found' } });

    } else {
      res.status(SUCCESS).json(result);
    }
  } catch (error) {
    console.error(error);
    res.status(ERROR)
      .json({ 'err': { 'code': 'not_found', 'message': 'Sale not found' } });
  }
};

module.exports = {
  postSales,
  getAllSales,
  getSaleById,
};
