const productsService = require('../services/productsService');
const createdStatus = 201;

const createProduct = async (req, res) => {
  try {
    const { name, quantity } = req.body;
    const newProduct = await productsService.createProduct(name, quantity);

    res.status(createdStatus).json(newProduct);
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  createProduct
};
