const Products = require('../Services/Products');

const create = async (req, res) => {
  try {
    const { name, quantity } = req.body;
    const result = await Products.create(name, quantity);
    res.status(result.code).json(result.message);
  } catch (error) {
    console.error(error);
  }
};

const getProduct = async (_req, res) => {
  try {
    const products = await Products.getProduct();
    res.status(products.code).json(products.list);
  } catch (error) {
    console.error(error);
  }
};

const getByProductId = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Products.getByProductId(id);
    res.status(product.code).json(product.message);
  } catch (error) {
    console.error(error);
  }
};

const updateByProductId = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, quantity } = req.body;
    const product = await Products.updateByProductId(id, name, quantity);
    res.status(product.code).json(product.message);
  } catch (error) {
    console.error(error);
  }
};

const deleteByProductId = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Products.deleteByProductId(id);
    res.status(result.code).json(result.message);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  create,
  getProduct,
  getByProductId,
  updateByProductId,
  deleteByProductId,
};