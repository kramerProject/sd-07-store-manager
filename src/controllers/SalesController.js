const SaleService = require('../services/SaleService');
const { SUCCESS } = require('./status');

module.exports = {
  create: async (req, res) => {
    try {
      const sales = req.body;
      const newSales =  await SaleService.create(sales);
      return res.status(SUCCESS).json(newSales);
    } catch ({ err, err_number }) {
      return res.status(err_number).json({ err });
    }
  },
};
