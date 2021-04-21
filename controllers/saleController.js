const saleModel = require('../models/saleModel');

const SUCCESS = 200;
const CREATE = 201;
const DELETE = 204;
const USERERR = 404;
const SERVERERR = 500;

const  Model = saleModel;

const getAllSales = async (_req, res) => {
  try {
    const results = await  Model.getAll();

    res.status(SUCCESS).send(results);
  } catch (err) {
    console.error(err);
    res.status(SERVERERR).json({ message: err.message });
  }
};

const getSaleById = async (req, res) =>  {
  try {
    const { id } = req.params;
    const result = await  Model.getById(id);
    res.status(SUCCESS).send(result);
  } catch (err) {
    console.log(err);
    res.status(SERVERERR).json({ message: err.message});
  }
};

const createSale = async (req, res) =>  {
  try {
    const { name, quantity } = req.body;
    const result = await  Model.create({ name, quantity });
    
    res.status(CREATE).send(result);
  } catch (err) {
    console.log(err);
    res.status(SERVERERR).json({ message: err.message });
    
  }
};

const updateSale = async (req, res) =>  {
  try {
    const { name, quantity } = req.body;
    const { id } = req.params;

    const result = await  Model.update({ id, name, quantity });
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

const deleteSale = async (req, res) =>  {
  try {
    const { id } = req.params;
    await  Model.exclude(id);
    
    res.status(DELETE).end();
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
