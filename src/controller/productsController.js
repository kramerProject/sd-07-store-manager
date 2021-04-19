const productsModel = require('../model/productsModel');
const { StatusCodes } = require('http-status-codes');
const productsServices = require('../services/productsServices');

const postNewProduct = async (req, res) => {
  try {
    const { name, quantity } = req.body;
    const newProduct = await productsServices.postNewProduct(name, quantity);
    return res.status(StatusCodes.CREATED).send(newProduct);
  } catch ({ message }) {
    res.status(StatusCodes.UNPROCESSABLE_ENTITY).send(message);
  } 
};

module.exports = {
  postNewProduct,
};
