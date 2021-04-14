const connect = require('../db');
const status = require('http-status');
const sale = require('../services/salesService');

const create = async (req, res) => {
  try {
    const sales = req.body;
    const result = await sale.insertSale(sales);
    return res.status(status.OK).json(result[0]);
  } catch (error) {
    
  }
};

const getAll = async (req, res) => {
  try {
    const result = await sale.getAll();
    return res.status(status.OK).json({sales:result});
  } catch (error) {
    return res.status(status.INTERNAL_SERVER_ERROR)
      .json();
  }
};

const updateSale = async (req, res) => {
  try {
    const {id} = req.params;
    const sales = req.body;
    const result = await sale.updateOne(id, sales);
    if(result){
      return res.status(status.OK).json({_id: id, itensSold: sales});
    }
  } catch (error) {
    console.log(error +  ' in updatesales');
    return res.status(status.INTERNAL_SERVER_ERROR)
      .json();
  }
};

const deleteOne = async (req, res) => {
  try {
    const {id} = req.params;
    const result = await sale.deleteOne(id);
    return res.status(status.OK).json(sale.getBySaleId(id));
  } catch (error) {
    
  }
}

module.exports = {
  create,
  getAll,
  updateSale,
  deleteOne
};