const productsModel = require('../model/productsModel');
const connection = require('../config/connection');
const {validateName} = require('../service/productService');

const addProduct = async (req, res) => {
  const quinhentos = 500;
  const twoOhOne = 201;
  try {
    const { name, quantity } = req.body;
    //fazendo validação
    validateName(name);
    const newItem = await productsModel.addItem(name, quantity); //adiciona ao db
    res.status(twoOhOne).json({newItem});
  } catch (err) {
    res.status(quinhentos).json({ message: err.message });
  }
};

module.exports = {
  addProduct
};