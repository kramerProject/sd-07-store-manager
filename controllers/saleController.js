const { saleModel } = require('../models');
const status = require('../status');

const addSale = async (req, res) => {
  try {
    const sale = req.body;
    const newSale = await saleModel.add(sale);
    res.status(status.OK).json(newSale);
  } catch (err) {
    res.status(status.INTERNAL_SERVER_ERROR).json(err.message);
  }
};
const getAllSales = async (req, res) => {
  try {
    const sales = await saleModel.getAll();
    res.status(status.OK).send(sales);
  } catch (err) {
    res.status(status.INTERNAL_SERVER_ERROR).json(err.message);
  }
};

const getSaleById = async (req, res) => {
  try {
    const { id } = req.params;
    const sale = await saleModel.getById(id);
    if (sale === null) return res.status(status.NOT_FOUND).send({
      err: {
        code: 'not_found',
        message: 'Sale not found'
      }
    });
    return res.status(status.OK).json(sale);
  } catch (err) {
    res.status(status.INTERNAL_SERVER_ERROR).json(err.message);
  }
};

const updateSale = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = {
      _id: id,
      itensSold: req.body
    };
    const sale = await saleModel.update(updateData);
    return res.status(status.OK).json(sale);
  } catch (err) {
    res.status(status.INTERNAL_SERVER_ERROR).json(err.message);
  }
};

const deleteSale = async (req, res) => {
  try {
    const { id } = req.params;
    const sale = await saleModel.deleteOneSale(id);
    if (sale === null) return res.status(status.INVALID_DATA).send({
      err: {
        code: 'invalid_data',
        message: 'Wrong sale ID format'
      }
    });
    return res.status(status.OK).json(sale);
  } catch (err) {
    res.status(status.INTERNAL_SERVER_ERROR).json(err.message);
  }
};

module.exports = {
  addSale,
  getAllSales,
  getSaleById,
  updateSale,
  deleteSale
};