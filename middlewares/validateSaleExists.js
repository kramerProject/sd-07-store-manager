const connection = require('../config/conn');
const { ObjectId } = require('mongodb');

const duplicatedId = async (id) => {
  if (!ObjectId.isValid(id)) return null; 
  
  return connection().then((db) => 
    db.collection('sales').findOne({_id: ObjectId(id) }));
};

const validateSaleExistsMiddleware = async (req, res, next) => {
  const zero = 0;
  const HTTP404 = 404;
  const { id } = req.params;
  const saleExists = await duplicatedId(id);  
  if (saleExists === null) {
    return res.status(HTTP404).json({
      err:{
        code: 'not_found', 
        message: 'Sale not found'
      }
             
    });
  }
  
  next(); 

};

module.exports = validateSaleExistsMiddleware;