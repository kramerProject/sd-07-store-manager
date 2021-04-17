const modelsSales = require('../models/modelsSales');
const servicesSales = require('../services/servicesSales');

const createNew = async (req, res) => {
  const newSaleArray = req.body;
  try {
    const newSale = await servicesSales.create(newSaleArray);
    if (!newSale) {
      return res.status(400).json({ message: 'Bad Request - malformed request syntax' });
    }
    return res.status(200).json(newSale);
  } catch (err) {
    if (err.code === 'invalid_data') {
      return res.status(422).json({ err });
    }
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getAll = async (req, res) => {
  try {
    const allSales = await servicesSales.getAll();
    // const allSales = await modelsSales.getAll();

    res.status(200).json(allSales);
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getById = async (req, res) => {
  const { id } = req.params;
  try {
    const salesById = await servicesSales.getById(id);
    res.status(200).json(salesById);
  } catch (err) {
    if (err.code === 'invalid_data') {
      return res.status(422).json({ err });
    }
    res.status(500).json({ message: 'Internal server error' });
    // res.status(422).json({ err });
  }
};

const updateById = async (req, res) => {
  const { id } = req.params;
  const sale = req.body;
  try {
    const updatedSale = await servicesSales.updateById(id, sale);
    res.status(200).json(updatedSale);
  } catch (err) {
    if (err.code === 'invalid_data') {
      return res.status(422).json({ err });
    }
    res.status(500).json({ message: 'Internal server error' });
  }
};

const excludeById = async (req, res) => {
  const { id } = req.params;
  try {
    const excludedSale = await servicesSales.excludeById(id);
    return res.status(200).json(excludedSale);
  } catch (err) {
    if (err.code === 'invalid_data') {
      return res.status(422).json({ err });
    }

    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = {
  createNew,
  getAll,
  getById,
  updateById,
  excludeById
  // getAllSongs,
  // getById,
};
