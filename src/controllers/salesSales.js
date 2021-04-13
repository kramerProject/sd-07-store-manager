const sales = require('../services/salesService');
const codes = require('../services/codes');

const addSales = async (req, res) => {
  try {
    const { body } = req;
    const result = await sales.addSales(body);
    if (result.err) return res.status(codes.notProcessed).json(result);
    res.status(codes.sucess).json(result);
  } catch (error) {
    console.log(error.message);
  }

};

const getAll = async (_req, res) => {
  try {
    const result = await sales.getAll();
    return res.status(codes.sucess).json(result);
  } catch (error) {
    console.log(error.message);
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await sales.getById(id);
    if (result.err) return res.status(codes.notFound).json(result);
    res.status(codes.sucess).json(result);
  } catch (error) {
    console.log(error.message);
  }

};

const updateSale = async (req, res) => {
  try {
    const { body } = req;
    const { id } = req.params;
    const result = await sales.updateSale(id, body);
    if (result.err) return res.status(codes.notProcessed).json(result);
    res.status(codes.sucess).json(result);
  } catch (error) {
    console.log(error.message);
  }


};

const deleteSale = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await sales.deleteSale(id);
    if (result.err) return res.status(codes.notProcessed).json(result);
    res.status(codes.sucess).json(result);
  } catch (error) {
    console.log(error.message);
  }


};

module.exports = {
  addSales,
  getAll,
  getById,
  updateSale,
  deleteSale,
};