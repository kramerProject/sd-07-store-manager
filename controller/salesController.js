const salesModel = require('../models/salesModel');
const productsModel = require('../models/productsModel');
const { ObjectId } = require('mongodb');

const SUCCESS = 200;
// const CREATED = 201;
const BAD_REQUEST = 400;
const NOT_FOUND = 404;
const INVALID_DATA = 422;

const createSaleController = async (req, res) => {
  try{
    const itemsSold = req.body;
    matchProdInStock = await productsModel.productById(itemsSold[0].productId); //
    // console.log({matchProdInStock}); //
    matchProdSell = itemsSold[0];
    if (matchProdInStock.quantity < matchProdSell.quantity) {
      return res.status(NOT_FOUND).
        send({
          err: {
            code: 'stock_problem',
            message: 'Such amount is not permitted to sell',
          }
        });
    }
    const updatedStockQuantity = (matchProdInStock.quantity - matchProdSell.quantity);
    // console.log({updatedStockQuantity}); // 
    const {_id, name } = matchProdInStock;
    await productsModel.updateProduct(_id, name, updatedStockQuantity);
    const sale = await salesModel.createSale(itemsSold);
    // console.log({itemsSold});
    return res.status(SUCCESS).send(sale);
  } catch(err) {
    console.error({message: err.message});
  }
};


const updateSaleController = async (req, res) => {
  try {
    console.log('req.params: ', req.params); //
    const { id } = req.params; 
    const itensSold = req.body;
    // matchProdInStock = await productsModel.productById(itensSold[0].productId);
    // const saleToBeUpdated = await salesModel.saleById(id);
    // console.log({saleToBeUpdated}) // Ok
    // Promise.all(
    //   saleToBeUpdated.itensSold.map(({ productId, name }) => {
    //     return productsModel.updateProduct(productId, name, quantity);
    //   })
    // )
    /*
    const matchId = sales.find((prod) => {
    const id = prod.id;
    return allProducts.some((item) => ObjectId(item.id) !== ObjectId(id));
  });
    */
    console.log('req.body: ', req.body); //
    const updatedSale = await salesModel.updateSale(id, itensSold);
    return res.status(SUCCESS).send(updatedSale);
  } catch (err) {
    return res.status(BAD_REQUEST).send({ message: err.message });
  }
};

const deleteSaleController = async (req, res) => {
  console.log('entrei em deleteSaleControler'); //
  try {
    const { id } = req.params;
    const { itensSold } = await salesModel.saleById(id);
    Promise.all(
      itensSold.map((item) => {
        productsModel.updateQuantity(item.productId, item.quantity);
      })
    )
    console.log(id);
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
