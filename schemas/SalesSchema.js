

//validação feita om ajuda dos videos do conteudo da aulda do dia 27.2

const errors = {
  lowerThanZero: {
    code: 'invalid_data',
    message: 'Wrong product ID or invalid quantity'
  },
  notANumber: {
    code: 'invalid_data',
    message: 'Wrong product ID or invalid quantity'
  },
};

const isNotAnumber = (value) => (typeof value !== 'number');
const lowerThenZ = (value, min) => (value <= min);
const unprocess = 422;

const validatePost = async (itensSold) => {

  const{ quantity } = itensSold[0];
  const zero = 0;

  if (lowerThenZ(quantity, zero)) return { code: unprocess, err: errors.lowerThanZero };
  if (isNotAnumber(quantity)) return { code: unprocess, err: errors.notANumber };

  return {};
};

module.exports = {
  validatePost,
};