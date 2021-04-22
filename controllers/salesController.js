const salesModel = require('../models/salesModel');

const status200 = 200;
const status201 = 201;
const status500 = 500;

const getAllSales = async (req, res) => {
  try {
    const sales = await salesModel.getAll();
    return res.status(status200).json(sales);
  } catch (err) {
    console.error(err.message);
    return res.status(status500).json({ message: err.message });
  }
};

// const getSalesById = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const product = await salesModel.getById(id);
//     return res.status(status200).json(product);
//   } catch (err) {
//     console.error(err.message);
//     return res.status(status500).json({ message: err.message });
//   }
// };

const addSale = async (req, res) => {
  try {
    const itensSold = req.body;
    const newSale = await salesModel.add(itensSold);
    return res.status(status201).json(newSale);
  } catch (err) {
    console.error(err.message);
    return res.status(status500).json({ message: err.message });
  }
};

// const updateSale = async (req, res) => {
//   try {
//     const { name, quantity } = req.body;
//     const { id } = req.params;

//     const updateProduct = await salesModel.update(id, name, quantity);
//     return res.status(status200).json(updateProduct);
//   } catch (err) {
//     console.error(err.message);
//     return res.status(status500).json({ message: err.message });
//   }
// };

// const deleteSale = async (req, res) => {
//   try {
//     const { id } = req.params;
//     await salesModel.exclude(id);
//     return res.status(status200).end();
//   } catch (err) {
//     console.error(err.message);
//     return res.status(status500).json({ message: err.message });
//   }
// };

module.exports = {
  getAllSales,
  // getSalesById,
  addSale,
  // updateSale,
  // deleteSale
};
