const salesModel = require('../model/salesModel');
const unprocessableEntity = 404;

const salesIsPresentMiddleware = async (req, res, next) => {
  const { id } = req.params;
  const isPresent = await salesModel.showSalesId(id);
  console.log(isPresent);
  if ( !isPresent) {
    return res.status(unprocessableEntity).send({
      err: {
        code: 'not_found',
        message: 'Sale not found',
      },
    });
  }
  next();
};

module.exports = salesIsPresentMiddleware;
