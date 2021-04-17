const Products = require('../Services/Products');
const code = require('./CodeStatus');
const create = async (req, res) => {
  try {
    const { name, quantity } = req.body;
    const result = await Products.create(name, quantity);
    res.status(code.created).json(result.message);
  } catch (error) {
    res.status(code.unprocessableEntity).json(error.message);
  }
};

const getProduct = async (_req, res) => {
  try {
    const products = await Products.getProduct();
    res.status(code.ok).json(products.list);
  } catch (error) {
    res.json('Desculpe, algo deu errado :(');
  }
};

const getByProductId = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Products.getByProductId(id);
    res.status(code.ok).json(product.message);
  } catch (error) {
    res.status(code.unprocessableEntity).json(error.message);
  }
};

const updateByProductId = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, quantity } = req.body;
    const product = await Products.updateByProductId(id, name, quantity);
    res.status(code.ok).json(product.message);
  } catch (error) {
    res.status(code.unprocessableEntity).json(error.message);
  }
};

const deleteByProductId = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Products.deleteByProductId(id);
    res.status(code.ok).json(result.message);
  } catch (error) {
    res.status(code.unprocessableEntity).json(error.message);
  }
};

module.exports = {
  create,
  getProduct,
  getByProductId,
  updateByProductId,
  deleteByProductId,
};