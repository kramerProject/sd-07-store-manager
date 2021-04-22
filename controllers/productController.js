const { response } = require('express');
const productModel = require('../models/productModel');
const productService = require('../services/productService');

const SUCCESS = 200;
const CREATE = 201;
const DELETE = 204;
const USERERR = 404;
const SERVERERR = 500;

const Model = productModel;
const Service = productService;

const getAllProducts = async (_req, res) => {
  try {
    const results = await Model.getAll();
    
    res.status(SUCCESS).send({ products: results });
  } catch (err) {
    console.error(err);
    res.status(SERVERERR).json({ message: err.message });
  }
};

const getProductById = async (req, res) =>  {
  try {
    const { id } = req.params;
    const {status, response } = await Service.getById(id);
    if (!response) {
      const result = await Model.getById(id);
      return res.status(SUCCESS).send(result);
    }
    return res.status(status).send(response);
  } catch (err) {
    console.log(err);
    res.status(SERVERERR).json({ message: err.message});
  }
};

const createProduct = async (req, res) =>  {
  try {
    const { name, quantity } = req.body;
    const {status, response} = await Service.create({ name, quantity});
    if (!response) {
      const result = await Model.create({ name, quantity });
      return res.status(CREATE).send(result);
    }
    return res.status(status).json(response);
  } catch (err) {
    console.log(err);
    res.status(SERVERERR).json({ message: err.message });    
  }
};

const updateProduct = async (req, res) =>  {
  try {
    const { name, quantity } = req.body;
    const { id } = req.params;
    const {status, response} = await Service.update({ id, name, quantity });
    if (!response) {
      const result = await Model.update({ id, name, quantity });
      return res.status(SUCCESS).json({id, name, quantity});
    }    
    return res.status(status).json(response);

  } catch (err) {
    console.log(err);
    res.status(SERVERERR).json({ message: err.message});    
  }
};

const deleteProduct = async (req, res) =>  {
  try {
    const { id } = req.params;
    const {status, response} = await Service.exclude(id);
    if (!response) {
      await Model.exclude(id);
      return res.status(SUCCESS).end();
    }
    return res.status(status).json(response);
    
  } catch (err) {
    console.log(err);
    res.status(SERVERERR).json({ message: err.message});
    
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};
