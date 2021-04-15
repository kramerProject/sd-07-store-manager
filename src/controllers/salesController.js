const {
  newSaleIsValid,
} = require('../service/salesService');

const handleNewSale = async (req, res) => {
  try {
    const salesArray = req.body;
    const { http, message } = await newSaleIsValid(salesArray);
    res.status(http).json(message);
  } catch (error) {
    console.error(error.message);
  }
};

// const getAll = async (_req, res) => {
//   try {
//     const { http, message } = await getAllProducts();
//     res.status(http).json(message);
//   } catch (error) {
//     console.error(error.message);
//   }
// };

// const getById = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { http, message } = await handleGetById(id);
//     res.status(http).json(message);
//   } catch (error) {
//     console.error(error.message);
//   }
// };

// const updateById = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { name, quantity } = req.body;
//     const { http, message } = await handleUpdateById(id, name, quantity);
//     res.status(http).json(message);
//   } catch (error) {
//     console.error(error.message);
//   }
// };

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
};
