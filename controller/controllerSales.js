const {
  checkQuantities,
  checkQuantity,
  // checkIds,
  addToSales,
  serviceGetAllSales,
  serviceGetSalesById,
  serviceUpdateSalesById
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
    const result = await addToSales(salesList);
    return res.status(success).json(result);
  } catch (err) {
    res.status(unprocessable_entity).json({
      'err': { 'code': 'invalid_data', 'message': err.message }
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
  }
};

const updateSalesById = async (req, res) => {
  const { salesId } = req.params;
  try {
    const { productId, quantity} = req.body;
    checkQuantity(quantity);
    const newItem = await serviceUpdateSalesById(salesId, productId, quantity);
    return res.status(success).json(newItem);
  } catch (err) {
    res.status(unprocessable_entity).json({
      'err': { 'code': 'invalid_data', 'message': err.message }
    });
  }
};
module.exports = {
  controllerAddSales,
  getAllSales,
  getSalesById,
  updateSalesById
};