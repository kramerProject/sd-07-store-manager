const salesService = require('../services/salesService');
const SUCCSESS = 200;
const UNPROCESSABLE_ENTITY = 422;
const ERROR = 500;

const createSales = async (req, resp) => {
  try {
    const salesList = req.body;
    const { checkQuantity, sale, code } = await salesService.createSales(salesList);
    if (checkQuantity !== undefined) {
      const { code, message } = checkQuantity;
      return resp.status(code).json({ err: { code: 'invalid_data', message } });
    }

    resp.status(code).json(sale);

  } catch (error) {
    console.error(error.message);
    resp.status(ERROR).json({ message: error.message });
  }
};

const getAll = async (req, res) => {
  const sales = await salesService.getAll();

  res.status(SUCCSESS).json({ sales: sales });
};

const getSalesById = async (req, res) => {
  try {
    const { id } = req.params;

    const sale = await salesService.getSalesById(id);

    if (sale.msg) {
      return res.status(sale.status).json(sale.msg);
    }
    res.status(SUCCSESS).json(sale);
  } catch (err) {
    console.error(err.message);
    res.status(UNPROCESSABLE_ENTITY).json({ message: err.message });
  }
};

const updateSale = async (req, res) => {
  try {
    const { id } = req.params;
    const salesList = req.body;
    const sale = await salesService.updateSale(id, salesList);
    // console.log(sale);
    if (sale) {
      return res.status(sale.status).json(sale.msg);
    }
    res.status(SUCCSESS).json(sale);

  } catch (err) {
    console.error(err.message);
    res.status(UNPROCESSABLE_ENTITY).json(err.message);
  }
};

const deleteSale = async (req, res) => {
  try {
    const { id } = req.params;
    const sale = await salesService.deleteSale(id);
    //res.status(SUCCSESS).json(sale);
    // return res.status(sale.status).json(sale.msg);
    if (sale) {
      return res.status(sale.status).json(sale.msg);
    }
    res.status(SUCCSESS).json(sale);
  } catch (error) {
    console.error(error.message);
    res.status(UNPROCESSABLE_ENTITY).json(error.message);
  }
};

module.exports = {
  createSales,
  getSalesById,
  getAll,
  updateSale,
  deleteSale
};
// itensSold
