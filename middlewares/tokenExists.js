const productsModels = require('../models/products');
const productService = require('../service/productService');
const EXISTS = 422;

const tokenExists = async (req, res, next) => {

  const { name: nameFound  } = req.body;
  const result = await productService.getAll();

  const arrayNames = result.map((item)=> item.name);
  if(arrayNames.includes(nameFound)) {
    return res.status(EXISTS).json({
      err: {
        code: 'invalid_data',
        message: 'Product already exists'
      }
    });
  }
  next();
};

module.exports = tokenExists;

