const salesService = require('../service/salesService');
const STATUS_CREATED = 201;
const STATUS_OK = 200;
const STATUS_UNPROCESSABLE = 422;

const insertSales = async (req, res) => {
  try {
    const itensSold = await salesService.insertSales(req.body);
    return res.status(STATUS_OK).json(itensSold);

  } catch (error) {
    console.error({ message: 'Não entrou no controller' });
  }
};

const showAllSales = async (_req, res) => {
  try {
    const sales = await salesService.showAllSales();
    return res.status(STATUS_OK).json({ sales });
  } catch (error) {
    return res.status(STATUS_UNPROCESSABLE).json({ message: 'Não entrou no controller' });
  }
};

const showSalesId = async (req, res) => {
  try {
    const { id } = req.params;
    const sales = await salesService.showSalesId(id);
    const {_id, itensSold } = sales;
    return res.status(STATUS_OK).json({_id, itensSold });
  } catch (err) {
    return res.status(STATUS_UNPROCESSABLE).json({ message: 'Não entrou no controller' });
  }
};

const updateSale = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(req.body);
    const sale = await salesService.updateSale(id, req.body);
    const { value } = sale;
    return res.status(STATUS_OK).json(
      value
    );
  } catch (err) {
    return res.status(STATUS_UNPROCESSABLE).json({ message: 'Não entrou no controller' });
  }
};

const deleteSale = async (req, res) => {
  try {
    const { id } = req.params;
    const sales = await salesService.showSalesId(id);
    await salesService.deleteSale(id);
    return res.status(STATUS_OK).json(sales);
  } catch (error) {

  }
};
module.exports = {
  insertSales,
  showAllSales,
  showSalesId,
  deleteSale,
  updateSale
};
