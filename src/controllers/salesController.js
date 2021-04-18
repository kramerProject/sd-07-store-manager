const salesService = require('../services/salesService');
const OK = 200;
const NOT_FOUND = 404;
const UNPROCESSABLE_ENTITY = 422;
const INTERNAL_SERVER_ERROR = 500;

const createSale = async (req,res) => {
  try {
    const [...itensSold] = req.body;
    const result = await salesService.createSale(itensSold);

    if (result.err) {
      return res.status(UNPROCESSABLE_ENTITY).json(result);
    }

    return res.status(OK).json(result);

  } catch (error) {
    console.error(error);

    res.status(INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

const getAllSales = async (req, res) => {
  try {
    const results = await salesService.getAllSales();

    res.status(OK).json(results);
  } catch (error) {
    console.error(error);

    res.status(INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

const getSaleById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await salesService.getSaleById(id);

    if (result.err) {
      return res.status(NOT_FOUND).json(result);
    }

    res.status(OK).json(result);
  } catch (error) {
    console.error(error);
    
    res.status(INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

const updateSale = async (req, res) => {
  try {
    const [...itensSold] = req.body;
    const { id } = req.params;

    const result = await salesService.updateSale(id, itensSold);

    if (result.err) {
      return res.status(UNPROCESSABLE_ENTITY).json(result);
    }

    return res.status(OK).json(result);
  } catch (error) {
    console.error(error);
    
    res.status(INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

const deleteSale = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await salesService.deleteSale(id);

    if (result.err) {
      return res.status(UNPROCESSABLE_ENTITY).json(result);
    }

    return res.status(OK).json(result);
  } catch (error) {
    console.error(error);
    
    res.status(INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

module.exports = {
  createSale,
  getAllSales,
  getSaleById,
  updateSale,
  deleteSale
};