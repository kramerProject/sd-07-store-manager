const connection = require('../config/conn');
const { ObjectId } = require('mongodb');

const duplicatedId = async (id) => {
  if (!ObjectId.isValid(id)) return null; 
  
  return connection().then((db) => 
    db.collection('sales').findOne({_id: ObjectId(id) }));
};

const validateSaleExcludeMiddleware = async (req, res, next) => {
  const zero = 0;
  const HTTP422 = 422;
  const { id } = req.params;
  const saleExists = await duplicatedId(id);  
  if (saleExists === null) {
    return res.status(HTTP422).json({
      err:{
        code: 'invalid_data', 
        message: 'Wrong sale ID format'
      }
             
    });
  }
  
  next(); 

};

module.exports = validateSaleExcludeMiddleware;