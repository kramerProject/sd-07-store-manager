const productModel = require('../models/productModels');

const SUCESS = 200;
const FAIL = 500;

const createProducts = async (req, res) => {
  try {
    const { name, quantity } = req.body;
    const result = await productModel.createProducts(name, quantity);
    res.status(SUCESS).json(result);
  } catch (error) {
    console.error(error);
    res.status(FAIL).json({ error: 'nao foi possivel concluir esta achar' });
  }
};

module.exports = { createProducts };
