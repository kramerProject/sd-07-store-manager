const{ addSaleDB }= require('../models/saleModel');
const{ getSaleDB }= require('../models/saleModel');
const{ gelAllSalesDB }= require('../models/saleModel');
const{ updateSaleDB }= require('../models/saleModel');

const SUCCESS = 200;
const CREATED = 201;

const addSale = async (req, res) => {
  const itensSold = req.body;
  // console.log(`addSale no controller valor itensSold: ${itensSold}`);
  const data = await addSaleDB( itensSold );
  // console.log(`addSale no controller valor itensSold: ${itensSold}`);
  res.status(SUCCESS).json(data);
};

const getSale = async (req, res) => {
  const id = req.param;
  const data = await getSaleDB( id );
  // console.log(`getSale no controller valor data: ${data}`);
  res.status(SUCCESS).json(data);
};

const gelAllSales = async (req, res) => {
  const data = await gelAllSalesDB();
  // console.log(`gelAllSales no controller valor data: ${data}`);
  res.status(SUCCESS).json(data);
};

const updateSale = async (req, res) => {
  const salesId = req.param;
  const itensSold = req.body[0];
  console.log(`updateSale no controller valor productId: ${itensSold}`);
  const data = await updateSaleDB(itensSold, salesId);
  // console.log(`updateSale no controller valor data: ${data}`);
  res.status(SUCCESS).json(data);
};

module.exports = {
  addSale, getSale, gelAllSales, updateSale
};
