const salesService = require('../service/salesService');

const EXISTS = 422;
const ERROR = 404;

const tokenDelete = async (req, res, next) => {
  const { id } = req.params;
  const result = await salesService.getAll();

  const arrayId = result.map((item)=> item._id.toString());
  const testId = arrayId.includes(id);
  if(testId) {
    next();
  }
  else {res.status(EXISTS).json({
    err: {
      code: 'invalid_data',
      message: 'Wrong sale ID format'
    }
  });
  }
};
module.exports = tokenDelete;
