const SalesModel = require('../models/salesModel');

const SUCCESS = 200;
// const CREATED = 201;
// const BAD_REQUEST = 400;
// const NOT_FOUND = 404;
// const INVALID_DATA = 422;

const createSaleController = async (req, res) => {
  try{
    const itemsSold = [...req.body];
    const sale = await SalesModel.createSale(itemsSold);
    console.log('sale', sale);
    console.log(itemsSold);
    return res.status(SUCCESS).send(sale);
  } catch(err) {
    console.log({message: err.message});
  }
};

const getAllSalesController = async(req, res) => {
  const allSales = await SalesModel.getAllSales();
  // const result = {products: allSales };
  return res.status(SUCCESS).send(allSales);
};

// const salesByIdController = async(req, res) => {
//   const {id} = req.params;
//   const product = await SalesModel.saleById(id);
//   if (!product) {
//     return res.status(INVALID_DATA)
//       .send({
//         err: {
//           code: 'invalid_data',
//           message: 'Wrong id format',
//         }
//       });
//   }
//   console.log(product);
//   return res.status(SUCCESS).json(product);
// };

module.exports = {
  createSaleController,
  getAllSalesController,
  // salesByIdController,
};
