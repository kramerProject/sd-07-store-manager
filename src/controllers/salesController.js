const {
  newSaleIsValid,
  getAllSales,
  handleGetById,
  handleUpdateById,
} = require('../service/salesService');

const ERROR = 500;

const handleNewSale = async (req, res) => {
  try {
    const salesArray = req.body;
    const { http, message } = await newSaleIsValid(salesArray);
    return res.status(http).json(message);
  } catch (error) {
    return res.status(ERROR).send();
  }
};

const getAll = async (_req, res) => {
  try {
    const { http, message } = await getAllSales();
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
    const salesArray = req.body;
    const { http, message } = await handleUpdateById(id, salesArray);
    return res.status(http).json(message);
  } catch (error) {
    return res.status(ERROR).send();
  }
};

// const deleteById = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { http, message } = await handleDeleteById(id);
//     res.status(http).json(message);
//   } catch (error) {
//     console.error(error.message);
//   }
// };

module.exports = {
  handleNewSale,
  getAll,
  getById,
  updateById,
};
