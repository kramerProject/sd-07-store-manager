const Product = require('../models/productModel');

const OK = 200;
const CREATED = 201;
const SERVERROR = 500;
const ERR_UNPR_ENTITY = 422;

const getAll = async (_req, res) => {
  try {
    const results = { products: await Product.getAll() };
    res.status(OK).json(results);
  } catch (err) {
    console.error(err);
    res.status(SERVERROR).json({ message: err.message });
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Product.getById(id);

    if (!result) {
      res.status(ERR_UNPR_ENTITY).json(
        {
          'err': {
            'code': 'invalid_data',
            'message': 'Wrong id format'
          }
        }
      );
      return;
    }

    res.status(OK).json(result);
  } catch (err) {
    console.error(err);
    res.status(SERVERROR).json({ message: err.message });
  }
};


const createProduct = async (req, res) => {
  try {
    const { name, quantity } = req.body;
    const result = await Product.create(name, quantity);

    res.status(CREATED).json(result);
  } catch (err) {
    console.error(err);
    res.status(SERVERROR).json({ message: err.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, quantity } = req.body;

    const result = await Product.update({ id, name, quantity });
    if (!result) {
      res.status(SERVERROR).json({ message: 'Não encontrado' });
      return;
    }

    res.status(OK).json({ id, name, quantity });

  } catch (err) {
    console.error(err);
    res.status(SERVERROR).json({ message: err.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Product.exclude(id);

    if (!result) {
      res.status(ERR_UNPR_ENTITY).json(
        {
          'err': {
            'code': 'invalid_data',
            'message': 'Wrong id format'
          }
        }
      );
      return;
    }

    res.status(OK).json(result);
  } catch (err) {
    console.error(err);
    res.status(SERVERROR).json({ message: err.message });
  }
};


module.exports = {
  getAll,
  getById,
  createProduct,
  updateProduct,
  deleteProduct
};
