const SaleService = require('../services/saleService');
const ERROR = 500;

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

module.exports = {
  addSale,
};