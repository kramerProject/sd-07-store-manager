const Products = require('../services/Products');
const badRequest = 400;
const created = 201;
const serverError = 500;

const createProducts = async (req, res) => {
  try {
    const { name, quantity } = req.body;
    const products = await Products.createProducts(name, quantity);

    res.status(created).json({ message: 'Product successfully registered' });
  } catch (error) {
    console.log('error do controller', error);

    res.status(serverError).json({ message: error.message });
  }
};

module.exports = {
  createProducts,
};
