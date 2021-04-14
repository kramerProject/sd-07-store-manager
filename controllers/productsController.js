const Products = require('../services/ProductsServices');
const created = 201;
const serverError = 500;

const createProducts = async (req, res) => {
  try {
    const { name, quantity } = req.body;
    const products = await Products.createProducts(name, quantity);
    return res.status(created).json(products);
  } catch (error) {
    console.log('error do controller', error);
    return res.status(serverError).json({ message: error.message });
  }
};

module.exports = {
  createProducts,
};
