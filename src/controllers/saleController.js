const saleModel = require('../models/saleModel');
const {
  SUCCESS,
  SERVER_ERROR,
  SEMANTIC_ERROR,
  NEW_RESOURCE,
  UNPROCESSABLE_ENTITY,
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

module.exports = {
  postSales,
};
