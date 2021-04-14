const salesService = require('../service/salesService');
const {
  UNPROCESSABLE_ENTITY,
  CREATED,
  OK,
  NOT_FOUND
} = require('../httpsStatus.json');

const addSale = async (req, res) => {
  try {
    const { addSale } = salesService;
    const products = req.body;
  
    const newSale = await addSale(products);

    res.status(OK).json(newSale);
  } catch (error) {
    console.error(error);
    res.status(UNPROCESSABLE_ENTITY).json({
      err: {
        'code': 'invalid_data',
        'message': error.message
      }
    });
  }
};

const getAllSales = async (req, res) => {
  const { getAllSales } = salesService;
  const allSales = await getAllSales();
  res.status(OK).json(allSales);
};

const getSaleById = async (req, res) => {
  try {
    const { id } = req.params;
    const { getSaleById } = salesService;
    const sale = await getSaleById(id);
    res.status(OK).json(sale);
  } catch (error) {
    res.status(NOT_FOUND).json({
      err: {
        'code': 'not_found',
        'message': error.message
      }
    });
  }
};

const updateSale = async (req, res) => {
  try {
    const { id } = req.params;
    const products = req.body;
    const { updateSale } = salesService;

    const updatedSale = await updateSale(id, products);
    res.status(OK).json(updatedSale);
    
  } catch (error) {
    res.status(UNPROCESSABLE_ENTITY).json({
      err: {
        'code': 'invalid_data',
        'message': error.message
      }
    });
  }
};

const deleteSale = async (req, res) => {
  try {
    const { id } = req.params;
    const { deleteSale } = salesService;

    const deletedSale = await deleteSale(id);
    res.status(OK).json(deletedSale);
    
  } catch (error) {
    res.status(UNPROCESSABLE_ENTITY).json({
      err: {
        'code': 'invalid_data',
        'message': error.message
      }
    });
  }
};

module.exports = {
  addSale,
  getAllSales,
  getSaleById,
  updateSale,
  deleteSale
};