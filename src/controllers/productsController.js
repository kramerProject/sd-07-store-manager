const {
  newProductIsValid,
  getAllProducts,
  handleGetById,
  handleUpdateById,
  handleDeleteById,
} = require('../service/productsService');

const ERROR = 500;

const handleNewProduct = async (req, res) => {
  try {
    const { name, quantity } = req.body;
    const { http, message } = await newProductIsValid(name, quantity);
    return res.status(http).json(message);
  } catch (error) {
    return res.status(ERROR).send();
  }
};

const getAll = async (_req, res) => {
  try {
    const { http, message } = await getAllProducts();
    return res.status(http).json(message);
  } catch (error) {
    return res.status(ERROR).send();
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const { http, message } = await handleGetById(id);
    return res.status(http).json(message);
  } catch (error) {
    return res.status(ERROR).send();
  }
};

const updateById = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, quantity } = req.body;
    const { http, message } = await handleUpdateById(id, name, quantity);
    return res.status(http).json(message);
  } catch (error) {
    return res.status(ERROR).send();
  }
};

const deleteById = async (req, res) => {
  try {
    const { id } = req.params;
    const { http, message } = await handleDeleteById(id);
    return res.status(http).json(message);
  } catch (error) {
    return res.status(ERROR).send();
  }
};

module.exports = {
  handleNewProduct,
  getAll,
  getById,
  updateById,
  deleteById,
};
