const { sales } = require('../Services/salesService');


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


module.exports = {
  addSales,
};