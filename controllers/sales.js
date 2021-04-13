const sales = require('../services/sales');

const great = 201;
const created = 200;
const notFoud = 404;
const fail = 422;

const getSales = async (req, res) => {
  const result = await sales.getSales();

  return res.status(created).json({ sales: result });
};

const getSaleById = async (req, res) => {
  const { id } = req.params;
  const result = await sales.getSaleById(id);

  if(result.err) return res.status(notFoud).json({ err: result.err });

  return res.status(created).json(result);
};

const registerSales = async (req, res) => {
  const itensSold = req.body;

  const registeredSales = await sales.registerSales(itensSold);

  if(registeredSales.err) return res.status(fail).json({ err: registeredSales.err });

  return res.status(created).json(registeredSales.data);
};

const updateSales = async (req, res) => {
  const { id } = req.params;
  const itensSold = req.body;

  const saleUpdated = await sales.updateSale(id, itensSold);

  if(saleUpdated.err) return res.status(fail).json({ err: saleUpdated.err });

  return res.status(created).json(saleUpdated.data);
};

const deleteSale = async (req, res) => {
  const { id } = req.params;

  const deletedSale = await sales.deleteSale(id);

  if(deletedSale && deletedSale.err) {
    return res.status(fail).json({ err: deletedSale.err });
  };

  return res.status(created).json(deletedSale.data);
};

module.exports = {
  registerSales,
  getSales,
  getSaleById,
  deleteSale,
  updateSales
};
