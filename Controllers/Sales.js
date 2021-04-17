const Sales = require('../Services/Sales');
const code = require('./CodeStatus');

const create = async (req, res) => {
  try {
    const result = await Sales.create(req.body);
    res.status(code.ok).json(result.message);
  } catch (error) {
    res.status(code.unprocessableEntity).json(error.message);
  }
};

const getSales = async (_req, res) => {
  try {
    const list = await Sales.getSales();
    res.status(code.ok).json(list.message);
  } catch (error) {
    res.json('Algo deu errado :(');
  }
};

const getBySaleId = async (req, res) => {
  try {
    const { id } = req.params;
    const sale = await Sales.getBySaleId(id);
    res.status(code.ok).json(sale.message);
  } catch (error) {
    res.status(code.notFound).json(error.message);
  }
};

const updateSale = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedSale = await Sales.updateSale(id, req.body);
    res.status(code.ok).json(updatedSale.message);
  } catch (error) {
    res.status(code.unprocessableEntity).json(error.message);
  }
};

const deleteSale = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedSale = await Sales.deleteSale(id);
    res.status(code.ok).json(deletedSale.message);
  } catch (error) {
    res.status(code.unprocessableEntity).json(error.message);
  }
};

module.exports = {
  create,
  getSales,
  getBySaleId,
  updateSale,
  deleteSale,
};