const salesModel = require('../models/salesModel');
const { CREATED, SUCCESS } = require('../utils/statusCode.json');

const create = async (req, res) => {
  const products = req.body;
  const newSale = await salesModel.create(products);
  res.status(SUCCESS).json(newSale);
};

// const update = async (req, res) => {
//   const { name, quantity } = req.body;
//   const { id } = req.params;
//   const updatedProduct = await productsModel.update(id, name, quantity);
//   res.status(SUCCESS).json(updatedProduct);
// };

// const getAll = async (_req, res) => {
//   const products = await productsModel.getAll();
//   res.status(SUCCESS).json(products);
// };

// const getById = async (req, res) => {
//   const { id } = req.params;
//   const product = await productsModel.getById(id);
//   res.status(SUCCESS).json(product);
// };

// const deleteProduct = async (req, res) => {
//   const { id } = req.params;
//   const product = await productsModel.deleteProduct(id);
//   res.status(SUCCESS).json(product);
// };

module.exports = {
  create,
  // getAll,
  // getById,
  // update,
  // deleteProduct,
};

