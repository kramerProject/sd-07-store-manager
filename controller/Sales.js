const Vendas = require('../service/Sales');
const { UNPROCESSABLE_ENTITY, NOT_FOUND, OK } = require('../helper/status');

const addSales = async (req, res) => {
  const sales = req.body;

  const result = await Vendas.addSales(sales);

  const { code, message } = result;

  if (code === 'invalid_data') {
    return res.status(UNPROCESSABLE_ENTITY).send({ err: { code, message } });
  }

  if (code === 'stock_problem') {
    return res.status(NOT_FOUND).send({ err: { code, message } });
  }

  res.status(OK).send(result);
};

const findAllSales = async (req, res) => {
  const sales = await Vendas.findAllSales();

  res.status(OK).send({ sales });
};

const findSaleById = async (req, res) => {
  const { id } = req.params;

  const result = await Vendas.findSaleById(id);

  const { code, message } = result;

  if (code === 'not_found') return res.status(NOT_FOUND).send({ err: { code, message } });

  res.status(OK).send(result);
};

const updateSale = async (req, res) => {
  const { id } = req.params;
  const sales = req.body;

  const result = await Vendas.updateSale(id, sales);

  const { code, message } = result;

  if (code === 'invalid_data') {
    return res.status(UNPROCESSABLE_ENTITY).send({ err: { code, message } });
  }

  if (code === 'stock_problem') {
    return res.status(NOT_FOUND).send({ err: { code, message } });
  }

  res.status(OK).send(result);
};

const deleteSale = async (req, res) => {
  const { id } = req.params;

  const result = await Vendas.deleteSale(id);

  const { code, message } = result;

  if (code === 'invalid_data') {
    return res.status(UNPROCESSABLE_ENTITY).send({ err: { code, message } });
  }

  res.status(OK).send(result);
};

module.exports = {
  addSales,
  findAllSales,
  findSaleById,
  updateSale,
  deleteSale,
};
