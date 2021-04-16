const connection = require('../config/conn');
const { ObjectId } = require('mongodb');
const HTTP422 = 422;

const duplicatedId = async (id) => {
  if (!ObjectId.isValid(id)) return null;    
  return connection().then((db) => 
    db.collection('products').findOne({ _id: ObjectId(id) }));
};

const validateProductNotExistMiddleware = async (req, res, next) => {
  const { id } = req.params;
  const productExists = await duplicatedId(id);
  if (productExists === null) {
    return res.status(HTTP422).json({
      err:{
        code: 'invalid_data', 
        message: 'Wrong id format'
      }
             
    });
  }
  next();    
};

module.exports = validateProductNotExistMiddleware;