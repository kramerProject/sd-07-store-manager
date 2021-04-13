const ProductService = require('../services/ProductService');
const { CREATED } = require('./status');

module.exports = {
  create: async (req, res) => {
    try {
      const { name, quantity } = req.body;
      const newProduct =  await ProductService.create(name, quantity);
      res.status(CREATED).json(newProduct);
    } catch ({ err, err_number }) {
      return res.status(err_number).json({ err });
    }
  },
};
