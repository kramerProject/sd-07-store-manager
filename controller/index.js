const productServeices = require('../service');

const SUCESS = 200;
const CREATED = 201;
const FAIL = 500;

const createProducts = async (req, res) => {
  try {
    const { name, quantity } = req.body;
    const result = await productServeices.createProducts(name, quantity);
    
    res.status(CREATED).json(result);
  } catch (error) {
    console.error(error);
    res.status(FAIL).json({ error: 'nao foi possivel concluir esta achar' });
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
