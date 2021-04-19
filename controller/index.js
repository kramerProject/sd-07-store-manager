const productServeices = require('../service');

const SUCCESS = 200;
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

const getAll = async (req, res) => {
  try {
    res.status(SUCCESS).json({ "teste": "testando nova rota" });
  } catch (error) {
    
  }
};

const getProductsById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await productServeices.getProductsById(id);
    res.status(SUCCESS).json(result);
  } catch (error) {
    res.status(FAIL).json({ err: { code: 'invalid_data', message: error.message } });
  }
};

const updateProducts = async (req, res) => {};
const deleteProducts = async (req, res) => {};

module.exports = {
  createProducts,
  getAll,
  getProductsById,
  updateProducts,
  deleteProducts
};
