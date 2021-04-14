const productsService = require('../services/productsService');

const STATUS_CREATED = 201;
const STATUS_UNPROCESSABLE_ENTITY = 422;

const createProduct = async (req, res) => {
  const { name, quantity } = req.body;

  const newProduct = await productsService.createProduct(name, quantity);

  if (typeof newProduct === 'string') {
    res
      .status(STATUS_UNPROCESSABLE_ENTITY)
      .json({ err: { code: 'invalid_data', message: newProduct } });
  } else {
    res.status(STATUS_CREATED).json(newProduct);
  }
};

module.exports = { createProduct };
