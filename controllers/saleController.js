const SaleService = require('../services/saleService');
const ERROR = 500;
const SUCESS = 200;

const addSale = async (req, resp) => {
  try {
    const salesList = req.body;
    const { checkQuantity, sale, code } = await SaleService.addSale(salesList);
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

const getAll = async (req, resp) => {
  try {
    const sales = await SaleService.getAll();
    resp.status(SUCESS).json({sales: sales});
  } catch (error) {
    console.error(error.message);
	  resp.status(ERROR).json({ message: error.message });
  }
};

const getById = async (req, resp) => {
  try {
    const { id } = req.params;
    const { code, message, sale} = await SaleService.getById(id);
    if(message) return resp.status(code).json({ err: { code: 'not_found', message }});
    resp.status(code).json(sale);
  } catch (error) {
    console.error(error.message);
	  resp.status(ERROR).json({ message: error.message });
  }
};

const deleteSale = async (req, resp) => {
  try {
    const { id } = req.params;
    const { code, message, deletedSale } = await SaleService.deleteSale(id);
    if (deletedSale === undefined) {
      return resp.status(code).json({ err: { code: 'invalid_data', message } });
    }
    return resp.status(code).json(deletedSale);
  } catch (error) {
    console.error(error.message);
	  resp.status(ERROR).json({ message: error.message });
  }
};

module.exports = {
  addSale,
  getAll,
  getById,
  deleteSale,
};