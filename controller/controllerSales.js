const {
  checkQuantities,
  addToSales,
  serviceGetAllSales,
  serviceGetSalesById,
  serviceUpdateSalesById,
  serviceDeleteSalesById,
  updateProductAfterSale,
  serviceFindListById
} = require('../service/salesService');
const unprocessable_entity = 422;
const success = 200;
const not_found = 404;

//   const addProduct = async (req, res) => {
const controllerAddSales = async (req, res) => {
  const salesList = req.body;
  try {
    checkQuantities(salesList);
    const result = await addToSales(salesList);
    updateProductAfterSale(salesList, 'addSales');
    return res.status(success).json(result);
  } catch (err) {
    if (err.message.includes('amount')) {
      res.status(not_found).json({
        'err': { 'code': 'stock_problem', 'message': err.message }
      });
    } else {
      res.status(unprocessable_entity).json({
        'err': { 'code': 'invalid_data', 'message': err.message }
      });
    }
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
    const productList = req.body;
    checkQuantities(productList);
    const newItem = await serviceUpdateSalesById(salesId, productList);
    return res.status(success).json(newItem);
  } catch (err) {
    res.status(unprocessable_entity).json({
      'err': { 'code': 'invalid_data', 'message': err.message }
    });
  }
};

const deleteSalesById = async (req, res) => {
  const { id } = req.params;
  const salesList = await serviceFindListById(id);
  try {
    const result = await serviceDeleteSalesById(id);
    updateProductAfterSale(salesList, 'removeSales');
    if (result) return res.status(success).json(result);
  } catch (err) {
    if (err.message.includes('amount')) {
      res.status(not_found).json({
        'err': { 'code': 'stock_problem', 'message': err.message }
      });
    } else {
      res.status(unprocessable_entity).json({
        'err': { 'code': 'invalid_data', 'message': err.message }
      });
    }
  }
};
module.exports = {
  controllerAddSales,
  getAllSales,
  getSalesById,
  updateSalesById,
  deleteSalesById
};