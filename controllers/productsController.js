const productsModel = require('../models/productsModel');
const { CREATED } = require('../utils/statusCode.json');

const create = async (req, res) => {
  const { name, quantity } = req.body;
  const newProduct = await productsModel.create(name, quantity);
  res.status(CREATED).json(newProduct);
};

module.exports = {
  create,
};
