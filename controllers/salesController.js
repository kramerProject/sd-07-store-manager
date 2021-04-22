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

const getSaleById = async (req, res) => {
  try {
    const { id } = req.params;
    const sale = await salesModel.getById(id);
    return res.status(status200).json(sale);
  } catch (err) {
    console.error(err.message);
    return res.status(status500).json({ message: err.message });
  }
};

const addSale = async (req, res) => {
  try {
    const itensSold = req.body;
    const newSale = await salesModel.add(itensSold);
    return res.status(status200).json(newSale);
  } catch (err) {
    console.error(err.message);
    return res.status(status500).json({ message: err.message });
  }
};

const updateSale = async (req, res) => {
  try {
    const itensSold = req.body;
    const { id } = req.params;

    const updateSale = await salesModel.update(id, itensSold);
    return res.status(status200).json(updateSale);
  } catch (err) {
    console.error(err.message);
    return res.status(status500).json({ message: err.message });
  }
};

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
  getSaleById,
  addSale,
  updateSale,
  // deleteSale
};
