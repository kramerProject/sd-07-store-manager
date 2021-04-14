const {
  checkQuantities,
  // checkIds,
  addToSales
} = require('../service/salesService');
const unprocessable_entity = 422;
const success = 200;
 
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
module.exports = {
  controllerAddSales
};