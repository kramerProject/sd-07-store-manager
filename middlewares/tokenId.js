const productService = require('../service/productService');

const EXISTS = 422;
const tokenId = async (req, res, next) => {
  const { id } = req.params;
  console.log(id);
  const result = await productService.getAll();

  const arrayId = result.map((item)=> item._id.toString());
  const testId = arrayId.includes(id);
  console.log(testId);
  if(testId) {
    console.log('entrei aqui');
    next();
  }
  else {res.status(EXISTS).json({
    err: {
      code: 'invalid_data',
      message: 'Wrong id format'
    }
  });
  }
};
module.exports = tokenId;
