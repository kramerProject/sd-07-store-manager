const sales = require('../services/sales');

const SUCCESS = 201;
const SUCCESS_GET = 200;
const FAILURE = 422;
const NOT_FOUND = 404;

const getSales = async (req, res) => {
  const result = await sales.getSales();

  return res.status(SUCCESS_GET).json({ sales: result });
};

const getSaleById = async (req, res) => {
  const { id } = req.params;
  const result = await sales.getSaleById(id);

  if(result.err) return res.status(NOT_FOUND).json({ err: result.err });

  return res.status(SUCCESS_GET).json(result);
};

const registerSales = async (req, res) => {
  const itensSold = req.body;

  const registeredSales = await sales.registerSales(itensSold);

  if(registeredSales.err) return res.status(FAILURE).json({ err: registeredSales.err });

  return res.status(SUCCESS_GET).json(registeredSales.data);
};

const updateSales = async (req, res) => {
  const { id } = req.params;
  const itensSold = req.body;

  const saleUpdated = await sales.updateSale(id, itensSold);

  if(saleUpdated.err) return res.status(FAILURE).json({ err: saleUpdated.err });

  return res.status(SUCCESS_GET).json(saleUpdated.data);
};

const deleteSale = async (req, res) => {
  const { id } = req.params;

  const deletedSale = await sales.deleteSale(id);
  
  if(deletedSale && deletedSale.err) {
    return res.status(FAILURE).json({ err: deletedSale.err });
  };

  return res.status(SUCCESS_GET).json(deletedSale.data);
};

module.exports = {
  registerSales,
  getSales,
  getSaleById,
  deleteSale,
  updateSales
};
