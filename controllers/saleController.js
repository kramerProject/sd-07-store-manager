const saleModel = require('../models/saleModel');
const saleService = require('../services/saleService');

const SUCCESS = 200;
const CREATE = 201;
const DELETE = 204;
const USERERR = 404;
const SERVERERR = 500;

const Service = saleService;
const Model = saleModel;

const getAllSales = async (_req, res) => {
  try {
    const results = await  Model.getAll();

    res.status(SUCCESS).send({ sales: results });
  } catch (err) {
    console.error(err);
    res.status(SERVERERR).json({ message: err.message });
  }
};

const getSaleById = async (req, res) =>  {
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

const createSale = async (req, res) =>  {
  try {
    const sale = req.body;
    const {status, response} = await Service.create(sale);
    if (!response) {
      const result = await Model.create(sale);      
      return res.status(SUCCESS).json(result);
    }
    
    return res.status(status).json(response);
  } catch (err) {
    console.log(err);
    res.status(SERVERERR).json({ message: err.message });
    
  }
};

const updateSale = async (req, res) =>  {
  try {
    const sale = req.body;
    const { id } = req.params;
    const {status, response} = await Service.update({ id, sale });
    if (!response) {
      const result = await Model.update({ id, sale });
      return res.status(SUCCESS).json(result);
    }
    
    return res.status(status).json(response);
  } catch (err) {
    console.log(err);
    res.status(SERVERERR).json({ message: err.message});
    
  }
};

const deleteSale = async (req, res) =>  {
  try {
    const { id } = req.params;
    const {status, response} = await Service.exclude(id);
    if (!response) {
      await  Model.exclude(id);
      return res.status(SUCCESS).end();

    }
    return res.status(status).json(response);
  } catch (err) {
    console.log(err);
    res.status(SERVERERR).json({ message: err.message});
    
  }
};

module.exports = {
  getAllSales,
  getSaleById,
  createSale,
  updateSale,
  deleteSale
};
