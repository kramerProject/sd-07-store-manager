const SaleService = require('../services/SaleService');
const { SUCCESS, NOT_FOUND } = require('./status');

const ZERO = 0;

module.exports = {
  index: async (req, res) => {
    try {
      const sales = await SaleService.find();
      return res.status(SUCCESS).json({ sales });
    } catch ({ err, err_number }) {
      return res.status(err_number).json({ err });
    }
  },
  get: async (req, res) => {
    try {
      const { id } = req.params;
      const sales = await SaleService.get(id);
      if (sales.length === ZERO)
        throw {
          err: {
            code: 'not_found',
            message: 'Sale not found',
          },
          err_number: NOT_FOUND,
        };

      return res.status(SUCCESS).json(sales);
    } catch ({ err, err_number }) {
      return res.status(err_number).json({ err });
    }
  },
  create: async (req, res) => {
    try {
      const sales = req.body;
      const newSales =  await SaleService.create(sales);
      return res.status(SUCCESS).json(newSales);
    } catch ({ err, err_number }) {
      return res.status(err_number).json({ err });
    }
  },
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const sales = await SaleService.update(id, req.body);
      return res.status(SUCCESS).json(sales);
    } catch ({ err, err_number }) {
      return res.status(err_number).json({ err });
    }
  },
};
