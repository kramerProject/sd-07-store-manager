const STATUS = 422;
const ZERO = 0;

const RESULT = {
  err: {
    code: 'invalid_data',
    message: 'Wrong product ID or invalid quantity',
  }

};
const tokenIsvalid = (req, res, next) => {
  const test = req.body;
  const qtd = test.some((item)=> typeof item.quantity !== 'number');
  console.log(qtd);
  if (qtd) {
    return res.status(STATUS).json(RESULT);
  }
  next();
};
module.exports = tokenIsvalid;
