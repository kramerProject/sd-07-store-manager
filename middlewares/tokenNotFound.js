const salesService = require('../service/salesService');

const EXISTS = 422;
const ERROR = 404;

const tokenNotFound = async (req, res, next) => {
  const { id } = req.params;
  const result = await salesService.getAll();

  const arrayId = result.map((item)=> item._id.toString());
  const testId = arrayId.includes(id);
  if(testId) {
    console.log('entrei aqui');
    next();
  }
  else {res.status(ERROR).json({
    err: {
      code: 'not_found',
      message: 'Sale not found'
    }
  });
  }
};
module.exports = tokenNotFound;
