const {
  checkQuantities,
  // checkIds,
  addToSales,
  serviceGetAllSales,
  serviceGetSalesById
} = require('../service/salesService');
const unprocessable_entity = 422;
const success = 200;
const not_found = 404;
 
//   const addProduct = async (req, res) => {
const controllerAddSales = async (req, res) => {
  const salesList = req.body;
  try {
    //  await checkIds(salesList); não precisa disso?
        
    checkQuantities(salesList);
    const result = await addToSales (salesList);
    return res.status(success).json(result);
  } catch (err) {
    res.status(unprocessable_entity).json({
      'err': {'code': 'invalid_data', 'message': err.message }
    });
  }
};

const getAllSales = async (req, res) => {
  try {
    const salesList = await serviceGetAllSales();
    return res.status(success).json({ sales: salesList });
  } catch (err) {
    console.log(err.message);
  }
};

const getSalesById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await serviceGetSalesById(id);
    return res.status(success).json(result);
  } catch (err) {
    res.status(not_found).json({
      'err': {
        'code': 'not_found', 'message': err.message
      }
    });
  }};
module.exports = {
  controllerAddSales,
  getAllSales,
  getSalesById
};