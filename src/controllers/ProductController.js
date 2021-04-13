const ProductService = require('../services/ProductService');
const { SUCCESS, CREATED, UNPROCESSABLE_ENTITY } = require('./status');

const ZERO = 0;

module.exports = {
  index: async (req, res) => {
    try {
      const products = await ProductService.find();
      return res.status(SUCCESS).json({ products });
    } catch ({ err, err_number }) {
      return res.status(err_number).json({ err });
    }
  },
  get: async (req, res) => {
    try {
      const { id } = req.params;
      const products = await ProductService.get('_id', id);
      
      if (products.length === ZERO)
        throw {
          err: {
            code: 'invalid_data',
            message: 'Wrong id format',
          },
          err_number: UNPROCESSABLE_ENTITY,
        };

      const [ product ] = products;
      return res.status(SUCCESS).json(product);
    } catch ({ err, err_number }) {
      return res.status(err_number).json({ err });
    }
  },
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, quantity } = req.body;

      const product = await ProductService.update(id, { name, quantity });
      
      res.status(SUCCESS).json(product);
    } catch ({ err, err_number }) {
      return res.status(err_number).json({ err });
    }
  },
  create: async (req, res) => {
    try {
      const { name, quantity } = req.body;
      const newProduct =  await ProductService.create(name, quantity);
      return res.status(CREATED).json(newProduct);
    } catch ({ err, err_number }) {
      return res.status(err_number).json({ err });
    }
  },
  delete: async (req, res) => {
    try {
      const { id } = req.params;
      const product = await ProductService.delete(id);
      return res.status(SUCCESS).json(product);
    } catch ({ err, err_number }) {
      return res.status(err_number).json({ err });
    }
  }
};
