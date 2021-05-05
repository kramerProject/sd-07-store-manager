const invalidData = (message) => { throw { err: { code: 'invalid_data', message } }; };
const notFound = (message) => { throw { err: { code: 'not_found', message } }; };
const stockProblem = (message) => { throw { err: { code: 'stock_problem', message } }; };
const MIN_QTY = 1;

const checkInfosProduct = (objct) => {
  const qtyValue = Number(objct.quantity);
  const MIN_QTY_NAME = 5;

  if (Number.isNaN(qtyValue)) invalidData('"quantity" must be a number');
  if (objct.name.length < MIN_QTY_NAME) {
    invalidData('"name" length must be at least 5 characters long');
  };
  if (qtyValue < MIN_QTY) {
    invalidData('"quantity" must be larger than or equal to 1');
  };
};

const checkInfosSales = ({ quantity }) => {
  const qtyValue = Number(quantity);
  if (qtyValue < MIN_QTY || Number.isNaN(qtyValue)) {
    invalidData('Wrong product ID or invalid quantity');
  }
};

module.exports = {
  invalidData,
  notFound,
  stockProblem,
  checkInfosProduct,
  checkInfosSales
};
