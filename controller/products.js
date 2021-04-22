const Products = require('../service/products');

const createProduct = async (req, res) => {
  try {
    const { name, quantity } = req.body;
    const { code, message, result } = await Products.createProduct(name, quantity);

    if (!result) {
      return res.status(code).json({
        err: {
          code: 'invalid_data',
          message,
        },
      });
    }
    res.status(code).json(result[0]);
  } catch (err) {
    console.error(err);
  }
};

const getAllProducts = async (req, res) => {
  const { code, result } = await Products.getAllProducts();
  res.status(code).json({
    products: result,
  });
};

const getProductById = async (req, res) => {
  const { id } = req.params;

  const { code, message, result } = await Products.getProductById(id);

  if (!result) {
    return res.status(code).json({
      err: {
        code: 'invalid_data',
        message,
      },
    });
  }

  res.status(code).json(result[0]);
};

const updateProduct = async (req, res) => {
  try {
    const { name, quantity } = req.body;
    const { id } = req.params;
    const { code, message, result } = await Products.updateProduct(name, quantity, id);

    if (!result) {
      return res.status(code).json({
        err: {
          code: 'invalid_data',
          message,
        },
      });
    }
    res.status(code).json(result[0]);
  } catch (err) {
    console.error(err);
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;

  const { code, message, result } = await Products.deleteProduct(id);

  if (message) {
    return res.status(code).json({
      err: {
        code: 'invalid_data',
        message,
      },
    });
  }

  res.status(code).json(result[0]);
};

module.exports = { createProduct,
  getAllProducts, 
  getProductById, 
  updateProduct, 
  deleteProduct };
