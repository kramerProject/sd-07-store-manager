const modelsSales = require('../models/modelsSales');
const servicesSales = require('../services/servicesSales');

// const magicNumbers = [200, 201, 400, 404, 422, 500];

const OK = 200;
const CREATED = 201;
const BADREQUEST = 400;
const NOTFOUND = 404;
const UNPROCESSABLEENTITY = 422;
const INTERNALSERVERERROR = 500;

const createNew = async (req, res) => {
  const newSaleArray = req.body;
  try {
    const newSale = await servicesSales.create(newSaleArray);
    if (!newSale) {
      return res.status(BADREQUEST).json(
        { message: 'Bad Request - malformed request syntax' }
      );
    }
    return res.status(OK).json(newSale);
  } catch (err) {
    if (err.code === 'invalid_data') {
      return res.status(UNPROCESSABLEENTITY).json({ err });
    }
    res.status(INTERNALSERVERERROR).json({ message: 'Internal server error' });
  }
};

const getAll = async (req, res) => {
  try {
    const allSales = await servicesSales.getAll();
    // const allSales = await modelsSales.getAll();

    res.status(OK).json(allSales);
  } catch (err) {
    res.status(INTERNALSERVERERROR).json({ message: 'Internal server error' });
  }
};

const getById = async (req, res) => {
  const { id } = req.params;
  try {
    const salesById = await servicesSales.getById(id);
    res.status(OK).json(salesById);
  } catch (err) {
    console.log(err);
    if (err.code === 'not_found') {
      return res.status(NOTFOUND).json({ err });
    }
    res.status(INTERNALSERVERERROR).json({ message: 'Internal server error' });
    // res.status(UNPROCESSABLEENTITY).json({ err });
  }
};

const updateById = async (req, res) => {
  const { id } = req.params;
  const sale = req.body;
  try {
    const updatedSale = await servicesSales.updateById(id, sale);
    res.status(OK).json(updatedSale);
  } catch (err) {
    if (err.code === 'invalid_data') {
      return res.status(UNPROCESSABLEENTITY).json({ err });
    }
    res.status(INTERNALSERVERERROR).json({ message: 'Internal server error' });
  }
};

const excludeById = async (req, res) => {
  const { id } = req.params;
  try {
    const excludedSale = await servicesSales.excludeById(id);
    return res.status(OK).json(excludedSale);
  } catch (err) {
    if (err.code === 'invalid_data') {
      return res.status(UNPROCESSABLEENTITY).json({ err });
    }

    res.status(INTERNALSERVERERROR).json({ message: 'Internal Server Error' });
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
