const connect = require('../db');
const status = require('http-status');
const product = require('../services/productService');

const create = async (req, res) => {
  try {
    const {name, quantity} = req.body;
    const result = await product.insertProduct(name, quantity);
    return res.status(status.CREATED).json(result[0]);
  } catch (error) {
    return res.status(status.INTERNAL_SERVER_ERROR)
      .json();
  }
};

const show = async (req, res) =>{
  try {
    const result = await product.getAllProducts();
    return res.status(status.OK).json({products:result});
  } catch (error) {
    return res.status(status.INTERNAL_SERVER_ERROR)
      .json();
  }
};

const showOne = async (req, res) =>{
  try {
    const {id} = req.params;
    const result = await product.getByProductId(id);
    return res.status(status.OK).json(result);
  } catch (error) {
    return res.status(status.INTERNAL_SERVER_ERROR)
      .json();
  }
};

const updateOne = async (req, res) => {
  try {
    const {id} = req.params;
    const {name, quantity} = req.body;
    console.log(id+name+quantity)
    const result = await product.updateProduct(id, name, quantity);
    return res.status(status.OK).json(result);
  } catch (error) {
    console.log(error);
    return res.status(status.INTERNAL_SERVER_ERROR)
      .json();
  }
};

const deleteOne = async (req, res) => {
  try {
    const {id} = req.params;
    const result = await product.deleteOneProduct(id);
    return res.status(status.OK).json(result);
  } catch (error) {
    console.log(error);
    return res.status(status.INTERNAL_SERVER_ERROR)
      .json();
  }
};

module.exports = {
  create,
  show,
  showOne,
  updateOne,
  deleteOne
};