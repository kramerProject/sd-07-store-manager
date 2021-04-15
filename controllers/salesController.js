const salesModel = require('../models/salesModel');
const { SUCCESS } = require('../utils/statusCode.json');

const create = async (req, res) => {
  const products = req.body;
  const newSale = await salesModel.create(products);
  res.status(SUCCESS).json(newSale);
};

const update = async (req, res) => {
  const sale = req.body;
  const { id } = req.params;
  const updatedSale = await salesModel.update(id, sale);
  res.status(SUCCESS).json(updatedSale);
};

const getAll = async (_req, res) => {
  const sales = await salesModel.getAll();
  res.status(SUCCESS).json({sales});
};

const getById = async (req, res) => {
  const { id } = req.params;
  const sale = await salesModel
    .getById(id);
  res.status(SUCCESS).json(sale);
};

// const deleteProduct = async (req, res) => {
//   const { id } = req.params;
//   const product = await productsModel.deleteProduct(id);
//   res.status(SUCCESS).json(product);
// };

module.exports = {
  create,
  getAll,
  getById,
  update,
  // deleteProduct,
};

