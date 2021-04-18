const productServeices = require('../service');

const CREATED = 201;
const FAIL = 422;

const createProducts = async (req, res) => {
  try {
    const { name, quantity } = req.body;
    const result = await productServeices.createProducts(name, quantity);
    res.status(CREATED).json(result);
  } catch (error) {
    res.status(FAIL).json({ err: { code: 'invalid_data', message: error.message } });
  }
};

const getProducts = async (res, req) => {};
const updateProducts = async (res, req) => {};
const deleteProducts = async (res, req) => {};

module.exports = {
  createProducts,
  getProducts,
  updateProducts,
  deleteProducts
};
