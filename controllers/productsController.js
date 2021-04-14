const productsService = require('../services/productsService');

const STATUS_CREATED = 201;
const STATUS_UNPROCESSABLE_ENTITY = 422;

const createProduct = async (req, res) => {
  const { name, quantity } = req.body;
  try {
    const newProduct = await productsService.createProduct(name, quantity);

    res.status(STATUS_CREATED).json(newProduct);
  } catch (error) {
    res
      .status(STATUS_UNPROCESSABLE_ENTITY)
      .json({ err: { code: 'invalid_data', message: error.message } });
  }
};

module.exports = { createProduct };
