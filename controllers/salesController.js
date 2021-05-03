const {
  createSalesService,
  getAllSalesService,
  getSaleByIdService,
  updateSaleService,
  deleteSaleService,
} = require('../services/salesService');

// const NEW_ITEM = 201;
const SUCCESS = 200;
const NOT_FOUND = 404;
const INVALID_DATA = 422;
const INTERNAL_ERROR = 500;

const createSalesController = async(req, res) => {
  try {
    const salesArrayOfItens = req.body;
    const newSale = await createSalesService(salesArrayOfItens);
    res.status(SUCCESS).json(newSale);
  } catch (error) {
    res.status(INTERNAL_ERROR).json({
      message: error.message,
    });
  }
};

const getAllSalesController = async(req, res) => {
  try {
    const sales = await getAllSalesService();
    res.status(SUCCESS).json({sales});
  } catch (error) {
    res.status(INTERNAL_ERROR).json({
      message: error.message,
    });
  }
};

const getSaleByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await getSaleByIdService(id);
    if(result.err) {
      return res.status(NOT_FOUND).json(result);
    }
    return res.status(SUCCESS).json(result);
  } catch (error) {
    res.status(INTERNAL_ERROR).json({
      message: error.message,
    });
  }
};

const updateSaleController = async (req, res) => {
  try {
    const salesArrayOfItens = req.body;
    const { id } = req.params;
    const result = await updateSaleService(id, salesArrayOfItens);
    return res.status(SUCCESS).json(result);
  } catch (error) {
    res.status(INTERNAL_ERROR).json({
      message: error.message,
    });
  }
};

const deleteSaleController = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await deleteSaleService(id);
    if(result.err) {
      return res.status(INVALID_DATA).json(result);
    }
    res.status(SUCCESS).end();
  } catch (error) {
    res.status(INTERNAL_ERROR).json({
      message: error.message,
    });
  }
};

module.exports = {
  createSalesController,
  getAllSalesController,
  getSaleByIdController,
  updateSaleController,
  deleteSaleController,
};
