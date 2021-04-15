const ProductService = require('../services/ProductService');
const helper = require('../helpers/isValid');
const code = require('../returnStatus/status.json');

const middlewareAlreadyIncluded = async (req, res, next) => {
  const { name } = req.body;
  const products = ProductService.getAll();
  const alreadyExist = await helper.productExist(products, name);
  
  if (!alreadyExist) {
    next();
  } else {
    res.status(code.Unprocessable_Entity).json({
      err: {
        code:'invalid_data',
        message:'Product already exists'
      }
    });
  }
};

module.exports = middlewareAlreadyIncluded;
