const productModel = require('../models/productModels');

const SUCESS = 200;
const FAIL = 500;

const createProducts = async (req, res) => {
  const { name, quantity } = req.body;
  try {
    const result = await productModel.createProducts(name, quantity);
    res.status(SUCESS).json(result);
  } catch (error) {
    console.error(error);
    res.status(FAIL).json({ menssage: error.menssage });
  }
};

module.exports = { createProducts };
