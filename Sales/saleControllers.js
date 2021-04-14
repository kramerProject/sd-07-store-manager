const saleModel = require('./saleModels');

const OK = 200;
const NOTFOUND = 404;
const ERROR = 422;

const addSale = async (req, res) => {
  try {
    const sold = await saleModel.addSale(req.body);
    res.status(OK).json(sold);
  } catch (error) {
    console.log(req.body);
    res.status(ERROR).json({ err: { code: 'invalid_data', message: error.message }});
  }
};

const getAllSales = async (_req, res) => {
  const sold = await saleModel.getAllSales();
  res.status(OK).json({ sales: [ sold ] });
};

const getSaleById = async (req, res) => {
  try {
    const  { id } = req.params;
    const sold = await saleModel.getSaleById(id);
    res.status(OK).json({ sales: [ sold ] });
  } catch (error) {
    res.status(NOTFOUND).json({ err: { code: 'not_found', message: error.message } });
  }
};

const uptadeSale = async (req, res) => {
  try {
    const  { id } = req.params;
    const sold = await saleModel.uptadeSale(id, req.body);
    res.status(OK).json(sold);
  } catch (error) {
    console.log(req.body);
    console.log(error);
    res.status(ERROR).json({ err: { code: 'invalid_data', message: error.message } });
  }
};

const deleteSale = async (req, res) => {
  try {
    const  { id } = req.params;
    const sold = await saleModel.deleteSale(id);
    res.status(OK).json(sold);
  } catch (error) {
    res.status(ERROR).json({ err: { code: 'invalid_data', message: error.message } });
  }
};

module.exports = {
  addSale,
  getAllSales,
  getSaleById,
  uptadeSale,
  deleteSale
};
