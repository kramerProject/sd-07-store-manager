const { 
  sales,
  returnAllProducts,
  returnProductsForId,
  updateSales,
} = require('../Services/salesService');


const addSales = async (req, res) => {
  const resOK = 200;
  const resErr= 422;

  try{
    const bodyReq = req.body;
    const result = await sales(bodyReq);
    res.status(resOK).json(result);
  } catch (err) {
    res.status(resErr).json({err});
  }
};

const getAllSales = async (req, res) => {
  const resOK = 200;
  const resErr= 404;

  try{
    const allSales = await returnAllProducts();
    res.status(resOK).json({sales: allSales});
  } catch (err) {
    res.status(resErr).json({err});
  }
};

const getAllSalesForId = async (req, res) => {
  const resOK = 200;
  const resErr= 404;

  try{
    const { _id } = req.params;
    const allSales = await returnProductsForId(_id);
    res.status(resOK).json(allSales);
  } catch (err) {
    res.status(resErr).json({err});
  }
};

const upateForId = async (req, res) => {
  const resOK = 200;
  const resErr= 422;

  try{
    const { id } = req.params;
    const bodyReq = req.body;
    const upSales = await updateSales(id, bodyReq);
    res.status(resOK).json(upSales);
  } catch (err) {
    res.status(resErr).json({err});
  }
};

module.exports = {
  addSales,
  getAllSales,
  getAllSalesForId,
  upateForId,
};