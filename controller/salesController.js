const salesModel = require('../models/salesModel');
const { ObjectId } = require('mongodb');


const SUCCESS = 200;
// const CREATED = 201;
const BAD_REQUEST = 400;
const NOT_FOUND = 404;
const INVALID_DATA = 422;

const createSaleController = async (req, res) => {
  try{
    const itemsSold = req.body;
    const sale = await salesModel.createSale(itemsSold);
    return res.status(SUCCESS).send(sale);
  } catch(err) {
    console.error({message: err.message});
  }
};

const updateSaleController = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedSale = await salesModel.updateSale(id, req.body);
    return res.status(SUCCESS).send(updatedSale);
  } catch (err) {
    return res.status(BAD_REQUEST).send({ message: err.message });
  }
};

const deleteSaleController = async (req, res) => {
  try {
    const { id } = req.params;
    await salesModel.deleteSale(id);
    if(!ObjectId.isValid(id)) {
      return res.status(INVALID_DATA).send({
        err: {
          code: 'invalid_data',
          message: 'Wrong sale ID format',
        }
      });
    }
    return res.status(SUCCESS).send({ message: 'Product deleted successfully' });
  } catch (err) {
    return res.status(INVALID_DATA).
      send({
        err: {
          code: 'invalid_data',
          message: 'Wrong sale ID format',
        }
      });
  }
};

const getAllSalesController = async(req, res) => {
  try {
    const allSales = await salesModel.getAllSales();
    // const result = {products: allSales };
    return res.status(SUCCESS).send(allSales);
  } catch (err) {
    return res.status(NOT_FOUND).send({message: err.message});
  }
};

const salesByIdController = async(req, res) => {
  const {id} = req.params;
  const product = await salesModel.saleById(id);
  try {
    if (product.err) {
      return res.status(NOT_FOUND)
        .send({
          err: {
            code: 'not_found',
            message: 'Sale not found',
          }
        });
    }
    return res.status(SUCCESS).json(product);
  } catch (err) {
    console.log(err.message);
    return res.status(NOT_FOUND).send({message: 'Sale not found'});
  }
};

module.exports = {
  createSaleController,
  updateSaleController,
  getAllSalesController,
  salesByIdController,
  deleteSaleController,
};
