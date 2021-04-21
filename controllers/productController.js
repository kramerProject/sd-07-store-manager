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

    res.status(SUCCESS).send(results);
  } catch (err) {
    console.error(err);
    res.status(SERVERERR).json({ message: err.message });
  }
};

const getProductById = async (req, res) =>  {
  try {
    const { id } = req.params;
    
    const result = await Model.getById(id);
    res.status(SUCCESS).send(result);
  } catch (err) {
    console.log(err);
    res.status(SERVERERR).json({ message: err.message});
  }
};

const createProduct = async (req, res) =>  {
  try {
    const { name, quantity } = req.body;
    const {status, response} = await Service.create({ name, quantity});
    console.log(status, 'err', response);
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

    const result = await Model.update({ id, name, quantity });
    if (!result) {
      res.status(USERERR).json({ message: 'Id não encontrado :(' });
      return;
    }
    
    res.status(SUCCESS).json({ id, name, quantity });
  } catch (err) {
    console.log(err);
    res.status(SERVERERR).json({ message: err.message});
    
  }
};

const deleteProduct = async (req, res) =>  {
  try {
    const { id } = req.params;
    await Model.exclude(id);
    
    res.status(DELETE).end();
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
