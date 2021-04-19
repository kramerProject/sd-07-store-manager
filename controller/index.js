const productServeices = require('../service/productsServices');
const salesServices = require('../service/salesServices');

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
    const result = await productServeices.getAll();
    res.status(SUCCESS).json({ products: result });
  } catch (error) {
    res.status(FAIL).json({ err: { code: 'invalid_data', message: error.message } });
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

const updateProducts = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, quantity } = req.body;
    const result = await productServeices.updateById(id, name, quantity);
    res.status(SUCCESS).json(result);
  } catch (error) {
    res.status(FAIL).json({ err: { code: 'invalid_data', message: error.message } });
  }
};

const deleteProducts = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await productServeices.deleteProducts(id);
    res.status(SUCCESS).json(result);
  } catch (error) {
    res.status(FAIL).json({ err: { code: 'invalid_data', message: error.message } });
  }
};

const createSales = async (req, res) => {
  try {
    const result = await salesServices.createSales(req.body);
    res.status(SUCCESS).json(result);
  } catch (error) {
    res.status(FAIL).json({ err: { code: 'invalid_data', message: error.message }});
  }
};

const getAllSales = async (req, res) => {
  try {
    const result = await salesServices.getAllSales();
    res.status(SUCCESS).json({ sales: [result] });
  } catch (error) {
    res.status(FAIL).json({ err: { code: 'invalid_data', message: error.message }});
  }
};

const getSalesById = async (req, res) => {};

const updateSales = async (req, res) => {};

const deleteSales = async (req, res) => {};

module.exports = {
  createProducts,
  getAll,
  getProductsById,
  updateProducts,
  deleteProducts,
  createSales,
  getAllSales,
  getSalesById,
  updateSales,
  deleteSales
};
