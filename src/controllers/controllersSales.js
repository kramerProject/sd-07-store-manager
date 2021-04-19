const modelsSales = require('../models/modelsSales');
const servicesSales = require('../services/servicesSales');

const magicNumbers = [200, 201, 400, 404, 422, 500];

const createNew = async (req, res) => {
  const newSaleArray = req.body;
  try {
    const newSale = await servicesSales.create(newSaleArray);
    if (!newSale) {
      return res.status(magicNumbers[2]).json(
        { message: 'Bad Request - malformed request syntax' }
      );
    }
    return res.status(magicNumbers[0]).json(newSale);
  } catch (err) {
    if (err.code === 'invalid_data') {
      return res.status(magicNumbers[4]).json({ err });
    }
    res.status(magicNumbers[5]).json({ message: 'Internal server error' });
  }
};

const getAll = async (req, res) => {
  try {
    const allSales = await servicesSales.getAll();
    // const allSales = await modelsSales.getAll();

    res.status(magicNumbers[0]).json(allSales);
  } catch (err) {
    res.status(magicNumbers[5]).json({ message: 'Internal server error' });
  }
};

const getById = async (req, res) => {
  const { id } = req.params;
  try {
    const salesById = await servicesSales.getById(id);
    res.status(magicNumbers[0]).json(salesById);
  } catch (err) {
    console.log(err);
    if (err.code === 'not_found') {
      return res.status(magicNumbers[3]).json({ err });
    }
    res.status(magicNumbers[5]).json({ message: 'Internal server error' });
    // res.status(magicNumbers[4]).json({ err });
  }
};

const updateById = async (req, res) => {
  const { id } = req.params;
  const sale = req.body;
  try {
    const updatedSale = await servicesSales.updateById(id, sale);
    res.status(magicNumbers[0]).json(updatedSale);
  } catch (err) {
    if (err.code === 'invalid_data') {
      return res.status(magicNumbers[4]).json({ err });
    }
    res.status(magicNumbers[5]).json({ message: 'Internal server error' });
  }
};

const excludeById = async (req, res) => {
  const { id } = req.params;
  try {
    const excludedSale = await servicesSales.excludeById(id);
    return res.status(magicNumbers[0]).json(excludedSale);
  } catch (err) {
    if (err.code === 'invalid_data') {
      return res.status(magicNumbers[4]).json({ err });
    }

    res.status(magicNumbers[5]).json({ message: 'Internal Server Error' });
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
