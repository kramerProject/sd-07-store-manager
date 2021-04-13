const Products = require('../services/Products');
const badRequest = 400;
const created = 201;

const createProducts = async (req, res) => {
  const { name, quantity } = req.body;

  const products = await Products.createProducts(name, quantity);

  if (!products) return res.status(badRequest).json({ message: 'Invalid Data'});

  res.status(created).json({ message: 'Product successfully registered'});
};

module.exports = {
  createProducts,
};